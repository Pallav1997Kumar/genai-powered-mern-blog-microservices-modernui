function uploadBlogImageController (req, res) {
    res.status(200).json({
        message: "Blog image uploaded successfully!",
        file: req.file,
    });
}


function uploadProfilePhotoController (req, res) {
    res.status(200).json({
        message: "Profile photo uploaded successfully!",
        file: req.file,
    });
}


module.exports = {
    uploadBlogImageController,
    uploadProfilePhotoController
};