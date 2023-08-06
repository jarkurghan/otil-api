import sign from "jwt-encode";

export default function token(id) {
  const token = sign(
    { id, exp: parseInt(new Date().getTime() / 1000) + 86400 },
    "hrpparoliuchunmaxfiykalit"
  );
  return token;
};
