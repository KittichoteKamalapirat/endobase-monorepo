import { Endo } from "../generated/graphql";
import { parseStrAndNumFromPosition } from "./parseStrAndNumFromPosition";

export const sortEndosByPosition = (endos: Endo[] | undefined) => {

    const sortedEndos = endos?.slice().sort((a, b) => {
        const positionA = parseStrAndNumFromPosition(a.position);
        const positionB = parseStrAndNumFromPosition(b.position);

        // compare string part alphabetically
        var result = positionA[0].localeCompare(positionB[0]);
        // if the string part is the same, compare the number part
        return result === 0 ? positionA[1] - positionB[1] : result;
    })

    return sortedEndos
}