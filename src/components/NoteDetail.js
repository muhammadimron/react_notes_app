import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils/index";

function NoteDetail({ note }){
    return (
        <table className="table__borderless">
            <tbody>
                <tr>
                    <td>ID</td>
                    <td>{note.id}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{note.title}</td>
                </tr>
                <tr>
                    <td>Content</td>
                    <td>{parser(note.body)}</td>
                </tr>
                <tr>
                    <td>Created At</td>
                    <td>{showFormattedDate(note.createdAt)}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{note.archived ? "Archived" : "Active"}</td>
                </tr>
            </tbody>
        </table>
    );
}

NoteDetail.propTypes = {
    note: PropTypes.object.isRequired
}

export default NoteDetail;