import {
    StateDomainSchema,
    StateDomain
} from "https://global.hexstream.dev/scripts/state-domain.mjs";

import {
    bind,
    DocumentSelector
} from "https://global.hexstream.dev/scripts/event-binding.mjs";

export {
    preferences
}

const showHide = {
    possibleValues: ["show", "hide"],
    defaultValue: "show"
};

const preferencesSchema = new StateDomainSchema(
    {
        "preview.visibility":
        showHide
    });

const preferences = new StateDomain(preferencesSchema);

bind("=",
     [
         {
             type: "storage",
             storage: globalThis.localStorage
         },
         {
             type: "storage",
             storage: preferences
         }
     ],
     {
         source:
         {
             keys: preferences.schema.keys
         }
     }
    );
bind("=",
     [
         {
             type: "storage",
             storage: preferences
         },
         {
             type: "selector",
             selector: new DocumentSelector(document.documentElement, "site-prefs")
         }
     ]);
bind(">",
     [
         {
             type: "storage",
             storage: preferences,
             keys: preferences.schema.keys
         },
         {
             type: "tokenlist",
             tokenlist: document.documentElement.classList
         }
     ]);
