
function Logging(level, title, content = "")
{
    console.log(`${level}:${title} ${content}`);
}

function MakeLogger(level)
{
    return (title, content) => { Logging(level, title, content) };
}

const d = (() => {
    if (process.env.NODE_ENV === "development") return MakeLogger("DEBUG");
    else return ()=>{};
})();
const i = MakeLogger("INFO");
const w = MakeLogger("WARN");
const c = MakeLogger("CRIT");

module.exports = {
    d, i, w, c
};