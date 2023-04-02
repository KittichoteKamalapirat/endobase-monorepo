import { ACTION_TYPE_VALUES } from "./actionTypeToLabel"

export const getActionLabel = (actionType: ACTION_TYPE_VALUES | "patient") => {
    switch (actionType) {
        case "take_out":
            return "1.Take Out"
        case "bring_to_washing_room":
            return "2. Bring to the Washing Room"
        case "patient":
            return "3 .Which patient used this endoscope?"
        case "leak_test_and_prewash":
            return "4. Leak Test"
        case "disinfect":
            return "5. Disinfection"
        case "store":
            return "6. Put back to storage and dry"

    }
}