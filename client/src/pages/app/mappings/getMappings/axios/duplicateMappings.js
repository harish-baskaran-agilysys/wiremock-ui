import { getDataById, postData } from "wiremock/axios";
import { cleanStubData } from "../../../utils/cleanStub";

const DuplicateMappings = async (id, session) => {

  try {
    const originalStub = await getDataById(id);
    if (!originalStub) {
      throw new Error("Mapping not found");
    }

    // Clone and clean the original stub
    const cleanedStub = cleanStubData(originalStub, session);

    // Remove the original ID so WireMock treats it as a new mapping
    delete cleanedStub.id;
    delete cleanedStub.uuid;

    // Append " - Copy" to the name (if present)
    if (cleanedStub.name) {
      cleanedStub.name = `${cleanedStub.name} - Copy`;
    }

    await postData(cleanedStub);
  } catch (error) {
    console.error("Failed to duplicate mapping:", error.message);
  }
};

export default DuplicateMappings;
