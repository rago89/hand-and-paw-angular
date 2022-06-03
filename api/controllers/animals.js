/* eslint-disable no-undefined */
/* eslint-disable no-underscore-dangle */

const animalManager = require("../business-logic/animals");
const userDbAccess = require("../data-access/users");
const deleteImage = require("../utils/delete-image");
const userManager = require("../business-logic/users");
const CustomError = require("../utils/custom-error");

const animalsController = {
  getAllAnimals: async (req, res) => {
    try {
      const animals = await animalManager.getAllAnimals();
      res.status(200).send(animals);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAnimal: async (req, res) => {
    try {
      const { id } = req.params;
      if ([...id].length !== 24) {
        throw new Error(`invalid id`);
      }
      const animal = await animalManager.getAnimal(id);
      res.status(200).send(animal);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
  updateAnimal: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      if (newData.type) {
        newData.type = newData.type.toLowerCase();
      }
      if (newData.breed) {
        newData.breed = newData.breed.toLowerCase();
      }
      // check user id
      if ([...newData.userId].length !== 24) {
        throw new Error(`invalid id`);
      }

      // check if subscriber exists
      const user = await userDbAccess.read(newData.userId);

      if (user.length === 0) {
        throw new Error(`cannot update animal user doesn't exist`);
      }

      if (req.files !== undefined) {
        await animalManager.updateAnimal(newData, req.files, id);
        const animalUpdated = await animalManager.getAnimal(id);
        res.status(200).send(animalUpdated);
        return;
      }

      await animalManager.updateAnimal(newData);
      const animalUpdated = await animalManager.getAnimal(id);
      res.status(200).send(animalUpdated);
    } catch (error) {
      // if any error ,make sure multer doesn't store image
      if (req.files) {
        const pictures = req.files;
        for (const picture in pictures) {
          deleteImage.deleteImageSync(
            pictures[picture][0].filename,
            "animal-uploads"
          );
        }
      }
      res.status(401).json({ message: error.message });
    }
  },
  deleteAnimal: async (req, res) => {
    try {
      //----------------------------------------------------------------

      const animalId = req.params.id;
      const { userId } = req.query;

      if ([...userId].length !== 24 || [...animalId].length !== 24) {
        throw new CustomError(`invalid id`, "ValidationError", "VE001");
      }

      const animal = await animalManager.getAnimal(animalId);
      if (animal.length === 0) {
        throw new CustomError(
          `Cannot delete animal id doesn't exist`,
          "ValidationError",
          "VE007"
        );
      }

      const user = await userManager.getUser(userId);
      if (user.length === 0) {
        throw new CustomError(
          `Cannot delete animal user doesn't exist`,
          "ValidationError",
          "VE007"
        );
      }

      if (user[0].registeredAnimals.length === 0) {
        throw new CustomError(
          `Cannot delete animal, the user do not have registered Animals`,
          "ValidationError",
          "VE008"
        );
      }

      const matchAnimal = user[0].registeredAnimals.some(
        (element) => element === animalId
      );

      if (!matchAnimal) {
        throw new CustomError(
          `The animal was not registered by user with the id: ${userId}`,
          "ValidationError",
          "VE009"
        );
      }

      const updateUser = await userManager.deletePublishedAnimal(
        userId,
        animalId
      );

      if (updateUser.acknowledged === true) {
        res.status(200).json({
          message: `publication id: ${animalId} was removed successfully`,
        });
      }

      //------------------------------------------------------------
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  postAnimal: async (req, res) => {
    try {
      const { body } = req;
      const { userId } = body;

      if ([...userId].length !== 24) {
        throw new Error(`invalid  user id`);
      }
      body.type = body.type.toLowerCase();
      body.breed = body.breed.toLowerCase();
      // check if subscriber exists
      const subscriber = await userDbAccess.read(userId);
      if (subscriber.length === 0) {
        throw new Error(`cannot publish animal user doesn't exist`);
      }
      body.pictures = [];
      const newPublication = await animalManager.createAnimal(body, req.files);
      // add the animal to the subscriber.publications
      if (newPublication.length !== 0) {
        await userDbAccess.updateUserPublication(
          newPublication._id,
          subscriber[0]._id
        );
      }
      res.status(201).json({ newPublication });
    } catch (error) {
      if (req.files) {
        const pictures = req.files;
        for (const picture in pictures) {
          deleteImage.deleteImageSync(
            pictures[picture][0].filename,
            "animal-uploads"
          );
        }
      }
      res.status(400).json({ message: error.message });
    }
  },
  updateOnePictureAnimal: async (req, res) => {
    try {
      const { animalId } = req.params;
      const { pictureId } = req.body;

      if ([...animalId].length !== 24 || [...pictureId].length !== 24) {
        throw new Error(`invalid id`);
      }
      // if there is an image uploaded
      const updatePicture = await animalManager.updateOnePicture(
        animalId,
        pictureId,
        req.file
      );
      if (
        updatePicture.acknowledged === true &&
        updatePicture.modifiedCount === 1
      ) {
        res.status(200).json({ message: "picture updated successfully" });
      }
    } catch (error) {
      if (req.file) {
        await deleteImage.deleteImageAsync(req.file.filename, "animal-uploads");
      }
      res.status(400).json({ message: error.message });
    }
  },
  deleteOnePictureAnimal: async (req, res) => {
    try {
      const { animalId } = req.params;
      const { pictureId } = req.body;
      if ([...animalId].length !== 24 || [...pictureId].length !== 24) {
        throw new Error(`invalid id`);
      }
      const deletePicture = await animalManager.deleteOnePicture(
        animalId,
        pictureId
      );
      res.status(200).json(deletePicture);
    } catch (error) {
      if (req.file) {
        await deleteImage.deleteImageAsync(req.file.filename, "animal-uploads");
      }
      res.status(400).json({ message: error.message });
    }
  },
  uploadPictures: async (req, res) => {
    try {
      const { animalId } = req.params;
      if ([...animalId].length !== 24) {
        throw new Error(`invalid id`);
      }
      if (req.files === undefined) {
        throw new Error("There are no pictures to upload");
      }
      const pictures = Object.values(req.files);
      const animal = await animalManager.getAnimal(animalId);
      const animalPicturesLength = animal[0].pictures.length;
      const newPicturesLength = pictures.length;
      const totalPictures = animalPicturesLength + newPicturesLength;

      if (totalPictures > 4) {
        throw new Error("You can only have 4 pictures by registration");
      }

      await animalManager.uploadPictures(animalId, req.files);
      // add the animal to the subscriber.publications
      if (newPicturesLength > 1) {
        res.status(201).json({ message: "pictures uploaded successfully" });
        return;
      }
      res.status(201).json({ message: "picture uploaded successfully" });
    } catch (error) {
      if (req.files) {
        const pictures = req.files;
        for (const picture in pictures) {
          deleteImage.deleteImageSync(
            pictures[picture][0].filename,
            "animal-uploads"
          );
        }
      }
      res.status(400).json({ message: error.message });
    }
  },
  updatePrincipalPicture: async (req, res) => {
    try {
      const { animalId } = req.params;
      const { pictureId, isPrincipal } = req.body;
      if ([...animalId].length !== 24 || [...pictureId].length !== 24) {
        throw new Error(`invalid id`);
      }
      const updatePicture = await animalManager.updatePrincipalPicture(
        animalId,
        pictureId,
        isPrincipal
      );
      res.status(200).json(updatePicture);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  filterAnimals: async (req, res) => {
    try {
      const filterOptions = req.body;
      const filteredAnimals = await animalManager.filterAnimals(filterOptions);
      res.status(200).send(filteredAnimals);
    } catch (error) {
      res.status(400).json({ error: error.message, stack: error.stack });
    }
  },
};

module.exports = animalsController;
