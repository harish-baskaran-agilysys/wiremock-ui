import Header from "wiremock/components/native/header";
import Button from "wiremock/components/native/button";
import { postStub } from "wiremock/recoil/selectors";
import { useRecoilValue } from "recoil";
import { getData, postData, updateData, updateMapping } from "wiremock/axios";
import BuilderMapping from "./paramSelector";
import { useSession } from "next-auth/react";
import { cleanStubData } from "../../utils/cleanStub";
import { getDecryptedUserRole } from "../../utils/roles";

const PostMappings = (props) => {
  const role = getDecryptedUserRole();
  const stub = useRecoilValue(postStub);
  const { data: session, status } = useSession();

  const handleButtonClick = async () => {
    const cleanedStub = cleanStubData(stub, session);
    try {
      if (cleanedStub.id && cleanedStub.id !== "") {
        await updateData(cleanedStub.id, cleanedStub);
      } else {
        await postData(cleanedStub);
      }
      props.setNewMapping(false);
      props.setIsPostMappingsVisible(false);
      props.setloadAgain(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] w-full">
      <div className="flex mt-2 justify-between">
        <Header size="large" label="Mapping Detail" className={"pt-1 pb-5"} />

        {role !== "viewer" ? (
          <div className="flex gap-2 mt-2">
            <Button
              icon="fas fa-save"
              label="Save"
              type="primary_inverse"
              className={"p-0"}
              onClick={() => handleButtonClick()}
            />
            <Button
              icon="fas fa-circle-xmark"
              label="Cancel"
              type="primary_link"
              className={"p-0"}
              onClick={() => props.setIsPostMappingsVisible(false)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <BuilderMapping />
      </div>
    </div>
  );
};

export default PostMappings;
