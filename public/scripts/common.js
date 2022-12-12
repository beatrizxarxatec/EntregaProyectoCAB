
async function getSentHistoryJson() {
    const currentUserId = sessionStorage.getItem('currentUserId');
    const url = "http://localhost:3000/rewards?" + new URLSearchParams({ currentUserId: currentUserId });
    const rewards = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const rewardsJSON = await rewards.json();
    return rewardsJSON;
}


function getTotalSentPoints(rewardsJSON) {
    let points = 0;
    for (let reward of rewardsJSON) {
        points += reward.xp_points;
    }
    return points;
}


async function getReceivedHistoryJson() {
    const currentUserId = sessionStorage.getItem('currentUserId');
    const url = "http://localhost:3000/received?" + new URLSearchParams({ currentUserId: currentUserId });
    const received = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const receivedJSON = await received.json();
    return receivedJSON;
}


function getTotalReceiveddPoints(receivedJSON) {
    let points = 0;
    for (let received of receivedJSON) {
        points += received.xp_points;
    }
    return points;
}

function DrawGraphics(sentPoints, receivedPoints) {
    var data1 = {
        series: [
            { value: 350, name: "Enviados", className: "pieChartEnv", meta: 'Meta One' },
        ]
    };
    new Chartist.Pie('#pieChart1', data1, { classNames: { label: "numberPie" } });

    if (sentPoints > 0 || receivedPoints > 0) {
        var data2 = {
            series: [
                { value: sentPoints, name: "Enviados", className: "pieChartEnv", meta: 'Meta One' },
                { value: receivedPoints, name: "Recibidos", className: "pieChartRec", meta: 'Meta Two' },
            ]
        };
        new Chartist.Pie('#pieChart2', data2, { classNames: { label: "numberPie" } });
    }
}

async function getStudentDataJson() {
    const currentUserId = sessionStorage.getItem('currentUserId');
    const url = "http://localhost:3000/students/" + currentUserId;
    const rewards = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const rewardsJSON = await rewards.json();
    return rewardsJSON;
}