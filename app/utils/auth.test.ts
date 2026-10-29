import { describe, it, expect } from "vitest";
import { getToken, saveToken, getUserFromToken } from "~/utils/auth";

// JWT de ejemplo (sin firma válida; el frontend solo decodifica): sub=cliente@correo.cl, roles=[ROLE_USER]
function fakeJwt(payload: object) {
  const b64 = (o: object) => btoa(JSON.stringify(o)).replace(/=/g, "");
  return `${b64({ alg: "HS256", typ: "JWT" })}.${b64(payload)}.firma`;
}

describe("Manejo de sesión (apoya REQ-FUNC-02)", () => {
  it("guarda y recupera el token", () => {
    saveToken("abc");
    expect(getToken()).toBe("abc");
  });

  it("decodifica correo y roles del token", () => {
    saveToken(fakeJwt({ sub: "cliente@correo.cl", roles: ["ROLE_USER"], exp: 9999999999, iat: 1 }));
    const user = getUserFromToken();
    expect(user?.sub).toBe("cliente@correo.cl");
    expect(user?.roles).toContain("ROLE_USER");
  });

  it("devuelve null si no hay token o es inválido", () => {
    expect(getUserFromToken()).toBeNull();
    saveToken("no-es-un-jwt");
    expect(getUserFromToken()).toBeNull();
  });
});
