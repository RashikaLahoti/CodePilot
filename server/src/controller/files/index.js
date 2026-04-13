import fs from "fs";
import path from "path";
import { customError, success } from "../../utils/response.util.js";

export const createFile = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    let {fileName} = req.body;
    if(!fileName) {
        return badRequest(res, {message: "File name is required"});
    }
    fs.writeFile(`${currentDir}/${fileName}`, "", (err) => {
        if(err) {
            return customError(res, {message: "File not created"});
        }
        return success(res, {message: "File created successfully"});
    })
}

export const readFile = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    fs.readFile(`${currentDir}/fn`, "utf-8", (err, data) => {
        if(err) {
            return customError(res, {message: "File not read"});
        }
        return success(res, {data, message: "File read successfully"});
    })
}

export const updateFile = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    fs.writeFile(`${currentDir}/fn`, "", (err) => {
        if(err) {
            return customError(res, {message: "File not updated"});
        }
        return success(res, {message: "File updated successfully"});
    })
}

export const deleteFile = (req, res) => {
    const currentDir = path.resolve() + "/assets";
    fs.unlink(`${currentDir}/fn`, (err) => {
        if(err) {
            return customError(res, {message: "File not deleted"});
        }
        return success(res, {message: "File deleted successfully"});
    })
}