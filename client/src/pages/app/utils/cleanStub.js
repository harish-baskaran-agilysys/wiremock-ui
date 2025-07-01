export const cleanStubData = (stub, session) => {
  // Create a deep copy to avoid mutating the original stub
  const cleanedStub = JSON.parse(JSON.stringify(stub));

  if (cleanedStub.response) {
    if (
      cleanedStub.response.hasOwnProperty("fault") &&
      cleanedStub.response.fault === "NONE"
    ) {
      delete cleanedStub.response.fault;
    }

    if (
      cleanedStub.response.hasOwnProperty("delay") &&
      cleanedStub.response.delay === "NONE"
    ) {
      delete cleanedStub.response.delay;

      if (cleanedStub.response.hasOwnProperty("fixedDelayMilliseconds")) {
        delete cleanedStub.response.fixedDelayMilliseconds;
      }
    }

    // Remove body if it's an empty object
    if (
      cleanedStub.response.hasOwnProperty("body") &&
      typeof cleanedStub.response.body === "object" &&
      Object.keys(cleanedStub.response.body).length === 0
    ) {
      delete cleanedStub.response.body;
    }
  }

  // Ensure metadata exists
  if (!cleanedStub.metadata) {
    cleanedStub.metadata = {};
  }

  const stored = JSON.parse(localStorage.getItem("manualSession"));

  // Add author info only if missing or empty
  if (
    !cleanedStub.metadata.author ||
    cleanedStub.metadata.author.trim() === ""
  ) {
    cleanedStub.metadata.author = session?.user?.name || stored.user.name;
  }

  if (
    !cleanedStub.metadata.author_email ||
    cleanedStub.metadata.author_email.trim() === ""
  ) {
    cleanedStub.metadata.author_email = session?.user?.email || stored.user.email;
  }

  cleanedStub.metadata.lastUpdatedBy_email = session?.user?.email || stored.user.email;

  return cleanedStub;
};
