export function formatPhoneNumber(inputPhoneNumber) {
  return inputPhoneNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
}
