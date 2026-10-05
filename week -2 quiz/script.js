const quiz = [
    {
        q: "q1",
        o: ["o1", "o2", "o3", "o4"],
        a: "o1",
    },
    {
        q: "q2",
        o: ["o1", "o2", "o3", "o4"],
        a: "o2",
    },
    {
        q: "q3",
        o: ["o1", "o2", "o3", "o4"],
        a: "o3",
    }
]
let i = 0, score = 0, time = 60;
function load() {
    document.getElementById("question").textContent = quiz[i].q;
    document.getElementById("options").innerHTML = quiz[i].o.map((option, index) =>      `
        <label>
            <input type="radio" name="answer" value="${option}" ${index === 0 ? "" : ""}>
            ${option}
        </label>
    `).join("");
}
function next(){
    const answer = document.querySelector("input[name=answer]:checked");
    if (answer && answer.value === quiz[i].a) score++;
    i++;
    if (i < quiz.length) load();
    else {
        document.getElementById("result").innerHTML = "score : " + score + "/" + quiz.length;
    }
}
load();
setInterval(() => {
    if (time <= 0) return;
    time--;
    if (time === 0) document.getElementById("result").innerHTML = "time up! score : " + score + "/" + quiz.length;
    else document.getElementById("timer").innerHTML = "time : " + time + " seconds";
}, 1000);