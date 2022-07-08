const Favorite = require("../models/Favorite");

class FavoriteServices {
  //ver favoritos
  static async getById(params) {
    console.log("params :", params);

    try {
      const data = await Favorite.find({ userId: params.userId });
      return {
        error: false,
        data: data,
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        data: "error 404: page not found",
      };
    }
  }

  //añadir animal a favoritos
  static async addOne(body) {
    try {
      const data = await Favorite.create(body);
      return {
        error: false,
        data: {
          _id: data._id,
          animalId: data.animalId,
          userId: data.userId
        },
      };
    } catch (error) {
      return {
        error: true,
        data: error,
      };
    }
  }

  //eliminar favorito
  static async deleteOne(id) {
    console.log("FAV SERVICES ID", id)
    try {
      const result = await Favorite.findByIdAndRemove(id);
      return {
        error: false,
        data: "Animal deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        data: "error: couldn't delete animal, it doesn't exist.",
      };
    }
  }
}

module.exports = FavoriteServices;
