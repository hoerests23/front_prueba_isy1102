import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProtectedRoute from "~/utils/ProtectedRoute";
import { saveToken } from "~/utils/auth";

function fakeJwt(roles: string[]) {
  const b64 = (o: object) => btoa(JSON.stringify(o)).replace(/=/g, "");
  return `${b64({ alg: "HS256" })}.${b64({ sub: "x@y.cl", roles, exp: 9999999999, iat: 1 })}.f`;
}

function renderRuta(roles: string[]) {
  return render(
    <MemoryRouter initialEntries={["/admin"]}>
      <ProtectedRoute rolesPermitidos={roles}>
        <div>Panel administrador</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
}

describe("Ruta protegida por rol (apoya REQ-SEG-01)", () => {
  it("rol ADMIN accede al panel", async () => {
    saveToken(fakeJwt(["ROLE_ADMIN"]));
    renderRuta(["ROLE_ADMIN"]);
    expect(await screen.findByText("Panel administrador")).toBeInTheDocument();
  });

  it("rol USER no accede al panel", async () => {
    saveToken(fakeJwt(["ROLE_USER"]));
    renderRuta(["ROLE_ADMIN"]);
    expect(screen.queryByText("Panel administrador")).not.toBeInTheDocument();
  });

  it("sin sesión no accede al panel", async () => {
    renderRuta(["ROLE_ADMIN"]);
    expect(screen.queryByText("Panel administrador")).not.toBeInTheDocument();
  });
});
