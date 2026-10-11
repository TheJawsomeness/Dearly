import { fetchFromSupabase, updateToSupabase } from "../utils/api.js";

const table = "click_counter";
const column = "count";

export async function getCounter() {
    const row = 0;
    const settings = await fetchFromSupabase(
        table,
        column
    );

    console.log(settings[row][column]);

    return settings[row][column];
}

export async function setCounter(value) {
    const id = 1;
    const settings = await updateToSupabase(
        table,
        {[column]:value},
        {id:id}
    );

    return settings;
}

export async function incrementCounter() {
    const currentCount = await getCounter();
    const newCount = currentCount + 1;

    await setCounter(newCount);
    
    return newCount;
}