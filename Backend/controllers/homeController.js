// Basic controller for homepage

exports.getHomePage = (req, res) => {
  try {
    // For now, return a simple JSON response
    res.json({
      success: true,
      message: "Homepage data retrieved successfully",
      data: {
        heroSection: {
          title: "Your Beautiful Wedding Story",
          subtitle: "Professional Wedding Photography & Videography",
          backgroundImage: "/images/default-hero.jpg"
        },
        featuredWeddings: [
          {
            title: "Sarah & John's Wedding",
            coupleNames: "Sarah & John",
            location: "Beachside Resort",
            date: "2023-06-15",
            thumbnailImage: "/images/wedding1.jpg"
          }
        ],
        aboutSection: {
          title: "About Us",
          description: "We capture authentic emotions and create timeless memories of your special day."
        }
      }
    });
  } catch (error) {
    console.error("Error in getHomePage:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

exports.updateHomePage = (req, res) => {
  try {
    // For now, just echo back the request
    res.json({
      success: true,
      message: "Homepage updated successfully",
      data: req.body
    });
  } catch (error) {
    console.error("Error in updateHomePage:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};