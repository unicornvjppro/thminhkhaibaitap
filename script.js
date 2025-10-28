// ======== CONFIG ========
// Thay link dưới bằng URL web app (đã deploy từ Google Apps Script)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxO2spVF2o-m401SnwvqsnRPstoJYmydlALMCEVduT4Se7UKkYDJundokhW0SvefdC-SQ/exec";

// ======== GỬI DỮ LIỆU LÊN GOOGLE SHEET ========
async function guiDuLieu() {
  const data = {
    mon: document.getElementById("mon").value.trim(),
    lop: document.getElementById("lop").value.trim(),
    loai: document.getElementById("loai").value.trim(),
    soLuong: document.getElementById("soLuong").value.trim(),
    mucDo: document.getElementById("mucDo").value.trim(),
    chuDe: document.getElementById("chuDe").value.trim()
  };

  // Kiểm tra dữ liệu rỗng
  if (!data.mon || !data.lop || !data.loai) {
    alert("Vui lòng nhập đầy đủ thông tin trước khi gửi!");
    return;
  }

  try {
    // Gửi dữ liệu qua Google Apps Script
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.result === "success") {
      alert("✅ Đã lưu thành công!");
      capNhatXemTruoc(data); // Hiển thị phần xem trước
      resetForm();
    } else {
      alert("❌ Lưu thất bại, thử lại sau!");
    }
  } catch (error) {
    console.error(error);
    alert("⚠️ Có lỗi kết nối tới server!");
  }
}

// ======== HIỂN THỊ XEM TRƯỚC KẾT QUẢ ========
function capNhatXemTruoc(data) {
  const preview = document.getElementById("preview");
  if (!preview) return;

  preview.innerHTML = `
    <h3>📝 Xem trước dữ liệu đã gửi</h3>
    <p><strong>Môn:</strong> ${data.mon}</p>
    <p><strong>Lớp:</strong> ${data.lop}</p>
    <p><strong>Loại:</strong> ${data.loai}</p>
    <p><strong>Số lượng:</strong> ${data.soLuong}</p>
    <p><strong>Mức độ:</strong> ${data.mucDo}</p>
    <p><strong>Chủ đề:</strong> ${data.chuDe}</p>
  `;
}

// ======== RESET FORM ========
function resetForm() {
  document.querySelectorAll("input, select, textarea").forEach(el => el.value = "");
}
