const API =
"https://script.google.com/macros/s/AKfycbz_qf_S5HGkfJd30svfSbzv4ZIpBX7bsmxwzx5wW5z4lHV5ECL079aSBZ9B7DCoGnnU/exec";

async function donate() {

  const name =
  document.getElementById("donator").value.trim();

  const amount =
  document.getElementById("amount").value;

  if (!name || !amount) {
    alert("กรุณากรอกข้อมูลก่อน");
    return;
  }

  try {

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        name: name,
        amount: amount
      })
    });

    if (!response.ok) {
      throw new Error("ส่งข้อมูลไม่สำเร็จ");
    }

    const box =
    document.getElementById("alert");

    box.innerHTML =
    `🎁 ${name} สนับสนุน ${amount} บาท 😸 ขอบคุณสำหรับค่าขนม 🩵`;

    box.style.display = "block";

    document.getElementById("donator").value = "";
    document.getElementById("amount").value = "";

    loadGoal();

  }
  catch (err) {

    console.error(err);
    alert("ส่งข้อมูลไม่สำเร็จ");

  }

}

async function loadGoal() {

  try {

    const res = await fetch(API);
    const data = await res.json();

    const current =
    Number(data.current || 0);

    const goal =
    Number(data.goal || 2000);

    document.getElementById("goalText").innerText =
    `${current} / ${goal} บาท`;

    const percent =
    Math.min((current / goal) * 100, 100);

    document.querySelector(".progress-bar").style.width =
    percent + "%";

    document.getElementById("percentText").innerText =
    percent.toFixed(1) + "%";

  }
  catch (err) {

    console.error(err);

    document.getElementById("goalText").innerText =
    "โหลดข้อมูลไม่สำเร็จ";

  }

}

loadGoal();
