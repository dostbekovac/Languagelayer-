window.onload = function () {

    let lastResult = null;

    const errorMessages = {
        404: "Resurs topilmadi (404). Iltimos URL manzilini tekshiring.",
        101: "Access Key kiritilmagan yoki noto‘g‘ri.",
        103: "Noto‘g‘ri API funksiyasi chaqirildi.",
        210: "Matn kiritilmadi. Iltimos, biror matn kiriting.",
        104: "API foydalanish limiti tugadi. Limitingiz to‘ldi.",
        106: "Juda tez-tez so‘rov yuborilmoqda. Birozdan keyin urinib ko‘ring.",
        107: "Bu funksiyani sizning tarifingiz qo‘llab-quvvatlamaydi.",
        102: "Foydalanuvchi hisob aktiv emas.",
        211: "Query matni oddiy matn bo‘lishi kerak, array emas.",
        212: "Batch uchun query array bo‘lishi kerak.",
        221: "Batch ichida 100 tadan ko‘p matn yuborib bo‘lmaydi.",
        910: "Tilni aniqlashda tizim xatosi yuz berdi.",
        911: "Batch aniqlashda tizim xatosi yuz berdi.",
        "network_error": "Tarmoq xatosi: serverga ulanib bo‘lmadi."
    };

    document.getElementById("b1").onclick = function () {

        let query = document.getElementById("inp").value;
        let accessKey = "1f0126b3aa9df924854e349cfa7c2983";

        document.querySelector(".ikki").innerHTML = "Yuklanmoqda...";

        fetch(`https://api.languagelayer.com/detect?access_key=${accessKey}&query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(json => {

                lastResult = json;

                if (!json.success && json.error) {
                    document.querySelector(".ikki").innerHTML =
                        showError(json.error.code);
                    return;
                }

                document.querySelector(".ikki").innerHTML = formatResult(json);
            })
            .catch(err => {
                document.querySelector(".ikki").innerHTML = showError("network_error");
            });
    };


    document.getElementById("b2").onclick = function () {
        if (!lastResult) return;

        if (!lastResult.success && lastResult.error) {
            document.querySelector(".ikki").innerHTML =
                showError(lastResult.error.code);
            return;
        }

        document.querySelector(".ikki").innerHTML = formatResult(lastResult);
    };

    document.getElementById("b3").onclick = function () {
        if (!lastResult) return;
        document.querySelector(".ikki").innerHTML =
            "<pre>" + JSON.stringify(lastResult, null, 4) + "</pre>";
    };


    function showError(code) {
        let uzMsg = errorMessages[code] || "Noma'lum xatolik.";

        return `
        <pre style="color:red; font-size:20px; font-weight:bold;">
❗ ${code}: ${uzMsg}
        </pre>
        `;
    }

    function formatResult(json) {
        let out = "";

        json.results.forEach(item => {
            out += `
<b>${item.language_name}</b>
Kod: ${item.language_code}
Match: ${item.percentage.toFixed(2)}%
Ehtimollik: ${item.probability}
Ishonchlilik: ${item.reliable_result}
<hr style="border: 0; border-top: 1px solid rgb(22, 22, 94); margin: 10px 0;">
`;
        });

        return `<pre style="color:rgb(22,22,94); font-size:18px;">${out}</pre>`;
    }

};
