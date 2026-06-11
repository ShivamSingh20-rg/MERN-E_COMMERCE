const userService = require('../services/user.service');
 const User = require('../models/user')
 const getUserprofile = async (req, res) => {
  try {
    // req.user.id comes from your verifyToken middleware
    const user = await User.findById(req.user).select('fullName email profileImage address'); 
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🎯 Make absolutely sure you are sending back the fullName and email properties!
    res.status(200).send({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers= async(req,res)=>{
    try{
const users =await userService.getAllUsers();
return res.send(users)
    }
    catch(error){
        return res.send({error:error.message})
    }
}

module.exports= {
    getAllUsers,getUserprofile
}