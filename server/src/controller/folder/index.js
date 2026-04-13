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

export const getFolder = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    fs.readdir(currentDir, (err, files) => {
        if(err) {
            return customError(res, {message: "Folder not found"});
        }
        return success(res, {message: "Folder found successfully", data: files});
    })
}

export const renameFolder = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    const {oldName, newName} = req.body;
    if(!oldName || !newName) {
        return badRequest(res, {message: "Folder name is required"});
    }
    fs.rename(`${currentDir}/${oldName}`, `${currentDir}/${newName}`, (err) => {
        if(err) {
            return customError(res, {message: "Folder not renamed"});
        }
        return success(res, {message: "Folder renamed successfully"});
    })
}

export const deleteFolder = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    const {folderName} = req.body;
    if(!folderName) {
        return badRequest(res, {message: "Folder name is required"});
    }
    fs.rmdir(`${currentDir}/${folderName}`, {recursive: true}, (err) => {
        if(err) {
            return customError(res, {message: "Folder not deleted"});
        }
        return success(res, {message: "Folder deleted successfully"});
    })
}
