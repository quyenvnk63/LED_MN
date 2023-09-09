const { v4: uuidv4 } = require('uuid');

function uuidToInt() {
  const uuid = uuidv4();
  // Loại bỏ các ký tự gạch ngang trong UUID
  const strippedUUID = uuid.replace(/-/g, '');
  // Chuyển đổi từ chuỗi thập lục phân sang số nguyên và giới hạn trong phạm vi cụ thể
  const intValue = parseInt(strippedUUID, 16) % 1000000; // Giới hạn trong khoảng từ 0 đến 999999
  return intValue;
}

module.exports = {
  uuidToInt,
};
