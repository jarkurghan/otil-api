/* eslint-disable import/no-anonymous-default-export */

export default function (word) {
    if (typeof word.example.example !== "undefined" && !word.example.example) delete word.example.example;
    if (typeof word.example.resource !== "undefined" && !word.example.resource) delete word.example.resource;
    if (typeof word.example.page !== "undefined" && !word.example.page) delete word.example.page;
    if (typeof word.definition.definition !== "undefined" && !word.definition.definition) delete word.definition.definition;
    if (typeof word.definition.resource !== "undefined" && !word.definition.resource) delete word.definition.resource;
    if (typeof word.definition.page !== "undefined" && !word.definition.page) delete word.definition.page;
    if (typeof word.history.history !== "undefined" && !word.history.history) delete word.history.history;
    if (typeof word.history.resource !== "undefined" && !word.history.resource) delete word.history.resource;
    if (typeof word.history.page !== "undefined" && !word.history.page) delete word.history.page;
    delete word.other_forms_text;
    delete word.other_forms_2_text;
    return word;
}
