export const parseStrAndNumFromPosition = (v: string): [string, number] => {
    // extract number (defaults to 0 if not present)
    var n = +(v.match(/\d+$/) || [0])[0];
    var str = v.replace(String(n), '');  // extract string part
    return [str, n];
}