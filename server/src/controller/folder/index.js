import fs from "fs";
import path from "path";
import { customError, success } from "../../utils/response.util.js";

export const createFolder = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    // let {folderName} = req.body;
    // if(!folderName) {
    //     return badRequest(res, {message: "Folder name is required"});
    // }
    fs.mkdir(`${currentDir}/ac`, {recursive: true}, (err) => {
        if(err) {
            return customError(res, {message: "Folder not created"});
        }
        return success(res, {message: "Folder created successfully"});
    })
}
