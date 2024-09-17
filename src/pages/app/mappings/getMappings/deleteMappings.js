import { deleteData } from "wiremock/axios";

const DeleteMappings = async (id) => {
  try {
    await deleteData(id);
  } catch (error) {
    console.log(error.message);
  }
};

export default DeleteMappings;
