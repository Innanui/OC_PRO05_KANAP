let url = new URL(document.location.href)
let orderId = url.searchParams.get("id")

let orderIdSpan = document.getElementById("orderId")
orderIdSpan.innerHTML = "<br>" + orderId
