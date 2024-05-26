import { useContext } from "react";
import { WebsiteContext } from "../Contexts/WebsiteContext";

function EditAddress() {
    const {indexToModify, setIndexToModify} = useContext(WebsiteContext);
    return (<></>);
}

export default EditAddress;