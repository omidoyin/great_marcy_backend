const Land = require("../models/Land");
const User = require("../models/User");
const Favorite = require("../models/Favorite");
const { getOptimizedUrls } = require("../utils/cloudinary");

/**
 * Get all available lands with pagination and sorting
 * @route GET /api/lands
 * @access Public
 */
const getAvailableLands = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Only get lands with status "Available"
    const filter = { status: "Available" };

    const lands = await Land.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Land.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: lands,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching lands:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lands",
      error: error.message,
    });
  }
};

/**
 * Get land details by ID
 * @route GET /api/lands/:id
 * @access Public
 */
const getLandDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const land = await Land.findById(id);
    if (!land) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }
    res.status(200).json({
      success: true,
      data: land,
    });
  } catch (error) {
    console.error("Error fetching land details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching land details",
      error: error.message,
    });
  }
};

/**
 * Add a new land
 * @route POST /api/lands
 * @access Private/Admin
 */
const addLand = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      size,
      description,
      features,
      landmarks,
      documents,
    } = req.body;

    // Process uploaded media files
    let images = [];
    let video = "";
    let brochureUrl = "";

    if (req.files) {
      // Get optimized URLs for uploaded media
      const mediaUrls = getOptimizedUrls(req.files);

      // Filter images, video, and brochure
      images = mediaUrls.filter(
        (url) =>
          url.endsWith(".jpg") ||
          url.endsWith(".jpeg") ||
          url.endsWith(".png") ||
          url.endsWith(".gif")
      );

      const videos = mediaUrls.filter(
        (url) =>
          url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".avi")
      );

      if (videos.length > 0) {
        video = videos[0]; // Use the first video
      }

      const brochures = mediaUrls.filter((url) => url.endsWith(".pdf"));

      if (brochures.length > 0) {
        brochureUrl = brochures[0]; // Use the first brochure
      }
    }

    // Create new land
    const newLand = new Land({
      title,
      location,
      price,
      size,
      images,
      video,
      brochureUrl,
      description,
      features: features ? JSON.parse(features) : [],
      landmarks: landmarks ? JSON.parse(landmarks) : [],
      documents: documents ? JSON.parse(documents) : [],
    });

    await newLand.save();

    res.status(201).json({
      success: true,
      data: newLand,
      message: "Land added successfully",
    });
  } catch (error) {
    console.error("Error adding land:", error);
    res.status(500).json({
      success: false,
      message: "Error adding land",
      error: error.message,
    });
  }
};

/**
 * Edit an existing land
 * @route PUT /api/lands/:id
 * @access Private/Admin
 */
const editLand = async (req, res) => {
  const { id } = req.params;
  try {
    // Find land to update
    const land = await Land.findById(id);
    if (!land) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    // Process uploaded media files
    if (req.files && req.files.length > 0) {
      // Get optimized URLs for uploaded media
      const mediaUrls = getOptimizedUrls(req.files);

      // Filter images, video, and brochure
      const newImages = mediaUrls.filter(
        (url) =>
          url.endsWith(".jpg") ||
          url.endsWith(".jpeg") ||
          url.endsWith(".png") ||
          url.endsWith(".gif")
      );

      if (newImages.length > 0) {
        // Append new images to existing ones
        req.body.images = [...land.images, ...newImages];
      }

      const videos = mediaUrls.filter(
        (url) =>
          url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".avi")
      );

      if (videos.length > 0) {
        req.body.video = videos[0]; // Use the first video
      }

      const brochures = mediaUrls.filter((url) => url.endsWith(".pdf"));

      if (brochures.length > 0) {
        req.body.brochureUrl = brochures[0]; // Use the first brochure
      }
    }

    // Parse JSON strings if they exist
    if (req.body.features) {
      req.body.features = JSON.parse(req.body.features);
    }

    if (req.body.landmarks) {
      req.body.landmarks = JSON.parse(req.body.landmarks);
    }

    if (req.body.documents) {
      req.body.documents = JSON.parse(req.body.documents);
    }

    // Update land
    const updatedLand = await Land.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedLand,
      message: "Land updated successfully",
    });
  } catch (error) {
    console.error("Error updating land:", error);
    res.status(500).json({
      success: false,
      message: "Error updating land",
      error: error.message,
    });
  }
};

/**
 * Delete a land
 * @route DELETE /api/lands/:id
 * @access Private/Admin
 */
const deleteLand = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLand = await Land.findByIdAndDelete(id);
    if (!deletedLand) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    // Remove land from user favorites
    await Favorite.deleteMany({ propertyType: "Land", propertyId: id });

    // Remove land from user purchased lands
    await User.updateMany(
      { purchasedLands: id },
      { $pull: { purchasedLands: id } }
    );

    res.status(200).json({
      success: true,
      message: "Land deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting land:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting land",
      error: error.message,
    });
  }
};

/**
 * Add land to user favorites
 * @route POST /api/lands/favorites/:id
 * @access Private
 */
const addLandToFavorites = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Check if land exists
    const land = await Land.findById(id);
    if (!land) {
      return res.status(404).json({
        success: false,
        message: "Land not found",
      });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      userId,
      propertyType: "Land",
      propertyId: id,
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: "Land already in favorites",
      });
    }

    // Add to favorites
    const favorite = new Favorite({
      userId,
      propertyType: "Land",
      propertyId: id,
    });

    await favorite.save();

    // Also add to user's favoriteLands array
    await User.findByIdAndUpdate(userId, { $addToSet: { favoriteLands: id } });

    res.status(200).json({
      success: true,
      message: "Land added to favorites successfully",
    });
  } catch (error) {
    console.error("Error adding land to favorites:", error);
    res.status(500).json({
      success: false,
      message: "Error adding land to favorites",
      error: error.message,
    });
  }
};

/**
 * Remove land from user favorites
 * @route DELETE /api/lands/favorites/:id
 * @access Private
 */
const removeLandFromFavorites = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Remove from favorites collection
    const result = await Favorite.findOneAndDelete({
      userId,
      propertyType: "Land",
      propertyId: id,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Land not found in favorites",
      });
    }

    // Also remove from user's favoriteLands array
    await User.findByIdAndUpdate(userId, { $pull: { favoriteLands: id } });

    res.status(200).json({
      success: true,
      message: "Land removed from favorites successfully",
    });
  } catch (error) {
    console.error("Error removing land from favorites:", error);
    res.status(500).json({
      success: false,
      message: "Error removing land from favorites",
      error: error.message,
    });
  }
};

/**
 * Get user's favorite lands
 * @route GET /api/lands/favorites
 * @access Private
 */
const getUserFavoriteLands = async (req, res) => {
  const userId = req.user._id;

  try {
    // Get favorites from Favorite collection
    const favorites = await Favorite.find({
      userId,
      propertyType: "Land",
    });

    // Extract land IDs
    const landIds = favorites.map((fav) => fav.propertyId);

    // Get land details
    const lands = await Land.find({ _id: { $in: landIds } });

    res.status(200).json({
      success: true,
      data: lands,
    });
  } catch (error) {
    console.error("Error fetching favorite lands:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching favorite lands",
      error: error.message,
    });
  }
};

/**
 * Get user's purchased lands
 * @route GET /api/lands/my-lands
 * @access Private
 */
const getUserPurchasedLands = async (req, res) => {
  const userId = req.user._id;

  try {
    // Get user with populated purchasedLands
    const user = await User.findById(userId).populate("purchasedLands");

    res.status(200).json({
      success: true,
      data: user.purchasedLands,
    });
  } catch (error) {
    console.error("Error fetching purchased lands:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching purchased lands",
      error: error.message,
    });
  }
};

/**
 * Search lands by title or location
 * @route GET /api/lands/search
 * @access Public
 */
const searchLands = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Create search filter
    const filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
      status: "Available",
    };

    // Execute search
    const lands = await Land.find(filter).skip(skip).limit(limit);

    const total = await Land.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: lands,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error searching lands:", error);
    res.status(500).json({
      success: false,
      message: "Error searching lands",
      error: error.message,
    });
  }
};

/**
 * Filter lands by various criteria
 * @route GET /api/lands/filter
 * @access Public
 */
const filterLands = async (req, res) => {
  try {
    const { minPrice, maxPrice, location, size, sortBy, sortOrder } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { status: "Available" };

    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (size) {
      filter.size = { $regex: size, $options: "i" };
    }

    // Build sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    } else {
      sort.createdAt = -1; // Default sort by newest
    }

    // Execute query
    const lands = await Land.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await Land.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: lands,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error filtering lands:", error);
    res.status(500).json({
      success: false,
      message: "Error filtering lands",
      error: error.message,
    });
  }
};

module.exports = {
  getAvailableLands,
  getLandDetails,
  addLand,
  editLand,
  deleteLand,
  addLandToFavorites,
  removeLandFromFavorites,
  getUserFavoriteLands,
  getUserPurchasedLands,
  searchLands,
  filterLands,
};
