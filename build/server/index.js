import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useNavigate, Link, Navigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Button as Button$1, Input, Card, Form, message, Table, Modal, InputNumber, Typography, Space, Tag, Select, Spin, Row, Col, Pagination, Badge, Divider, Image, Result } from "antd";
import { useState, useEffect, useMemo } from "react";
import { EyeInvisibleOutlined, EyeOutlined, ReloadOutlined, ArrowLeftOutlined, ShoppingCartOutlined, DeleteOutlined, CheckCircleOutlined, PrinterOutlined, HomeOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { useNavigate as useNavigate$1, useParams } from "react-router-dom";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message2 = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message2 = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message2
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function PrimaryButton({ text, onClick }) {
  return /* @__PURE__ */ jsx(
    Button$1,
    {
      type: "primary",
      block: true,
      onClick,
      htmlType: "submit",
      className: "h-12 rounded-lg font-bold bg-primary hover:bg-primary/90",
      children: text
    }
  );
}
function TextInput({
  placeholder,
  type = "text",
  value,
  onChange
}) {
  return /* @__PURE__ */ jsx(
    Input,
    {
      placeholder,
      type,
      value,
      onChange
    }
  );
}
function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  useNavigate();
  return /* @__PURE__ */ jsxs(
    Card,
    {
      style: {
        width: 380,
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black leading-tight", children: "Bienvenido de vuelta" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm", children: "Accede a tu biblioteca personal" })
        ] }),
        /* @__PURE__ */ jsxs(Form, { layout: "vertical", onFinish: onSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-700", children: "Correo" }),
              name: "correo",
              rules: [{ required: true }],
              children: /* @__PURE__ */ jsx(TextInput, { placeholder: "Ingresa tu correo", type: "email" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-700", children: "Contraseña" }),
              name: "contrasenia",
              rules: [{ required: true }],
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Ingresa tu contraseña",
                  type: showPassword ? "text" : "password",
                  size: "large",
                  style: { borderRadius: 10 },
                  suffix: showPassword ? /* @__PURE__ */ jsx(
                    EyeInvisibleOutlined,
                    {
                      onClick: () => setShowPassword(false),
                      style: { cursor: "pointer" }
                    }
                  ) : /* @__PURE__ */ jsx(
                    EyeOutlined,
                    {
                      onClick: () => setShowPassword(true),
                      style: { cursor: "pointer" }
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "text-right -mt-2 mb-5 text-sm text-gray-600", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/recuperar",
              className: "text-primary underline hover:text-primary/80 font-medium",
              children: [
                "¿Olvidaste tu contraseña?",
                " "
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "text-center space-y-7", children: [
            /* @__PURE__ */ jsx(PrimaryButton, { text: "Ingresar" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "¿No tienes una cuenta?",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/registro", className: "text-primary underline hover:text-primary/80", children: "Regístrate aquí" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
async function loginUser(data) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "Error en el login");
  }
  return responseData;
}
async function requestPasswordReset(data) {
  const response = await fetch("http://localhost:8080/auth/recuperar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(responseData.message || "Error solicitando recuperación");
  }
  return responseData;
}
async function resetPassword(data) {
  const response = await fetch("http://localhost:8080/auth/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(responseData.message || "Error reseteando la contraseña");
  }
  return responseData;
}
async function registerUser(data) {
  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(responseData.message || "Error registrando usuario");
  }
  return responseData;
}
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
function saveToken(token) {
  if (typeof window === "undefined") return;
  localStorage.removeItem("jwt");
  localStorage.setItem("token", token);
}
function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
function LoginPage() {
  useNavigate();
  const handleLogin = async (values) => {
    try {
      const data = await loginUser(values);
      saveToken(data.token);
      const user = getUserFromToken();
      if (!user) {
        message.error("Ocurrió un problema al procesar tu sesión. Por favor, intenta iniciar sesión de nuevo.");
        return;
      }
      if (user.roles.includes("ROLE_ADMIN")) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/usuario";
      }
    } catch (err) {
      const serverMsg = err?.message ? ` (${err.message})` : "";
      message.error(`No se pudo iniciar sesión. Revisa tu correo y contraseña e inténtalo de nuevo.${serverMsg}`);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center flex-1 bg-gray-50", children: /* @__PURE__ */ jsx(LoginForm, { onSubmit: handleLogin }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block flex-1", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/app/components/imgs/BibliotecaLogin2.jpg",
        alt: "Biblioteca",
        className: "w-full h-full object-cover"
      }
    ) })
  ] });
}
const login = UNSAFE_withComponentProps(function LoginRoute() {
  return /* @__PURE__ */ jsx(LoginPage, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
function ProtectedRoute({
  children,
  rolesPermitidos = []
}) {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(getUserFromToken());
  useEffect(() => {
    setIsClient(true);
    const decodedUser = getUserFromToken();
    setUser(decodedUser);
  }, []);
  if (!isClient) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  const tienePermiso = rolesPermitidos.length === 0 || user.roles?.some((r) => rolesPermitidos.includes(r));
  if (!tienePermiso) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function AdminLayout({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full bg-gray-100 flex justify-center items-start p-6", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-6xl bg-white rounded-xl shadow-lg p-8", children }) });
}
function Button({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `px-4 py-2 rounded ${styles[variant]} shadow ${className}`
    }
  );
}
function HeaderAdmin({ onLogoutClick }) {
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900", children: "Panel de Administración de Libros" }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-gray-600", children: "Gestiona el inventario de la tienda." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "secondary",
        className: "px-4 py-2 rounded bg-gray-200 dark:bg-blue-600 text-black dark:text-white",
        onClick: () => navigate("/admin/ventas"),
        children: "Ver Ventas"
      }
    ) }),
    /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: onLogoutClick, children: "Cerrar sesión" })
  ] });
}
function Toolbar({ onAdd }) {
  useNavigate$1();
  return /* @__PURE__ */ jsx("div", { className: "flex justify-start mb-6", children: /* @__PURE__ */ jsx(Button, { onClick: onAdd, children: "+ Añadir Libro" }) });
}
function TableActions({ onEdit, onDelete }) {
  return /* @__PURE__ */ jsxs("div", { className: "text-right space-x-2", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "p-2 text-blue-600 hover:text-blue-800",
        onClick: onEdit,
        children: "✏️"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "p-2 text-red-600 hover:text-red-800",
        onClick: onDelete,
        children: "🗑️"
      }
    )
  ] });
}
function LibrosTable({ libros: propLibros, loading = false, onDelete, onUpdate, onCreate }) {
  const [editingLibro, setEditingLibro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleEdit = (libro) => {
    setEditingLibro(libro);
    setIsModalOpen(true);
  };
  const columns = [
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Autor", dataIndex: "autor", key: "autor" },
    { title: "Año", dataIndex: "anio", key: "anio" },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    {
      title: "Precio",
      key: "precio",
      render: (_, row) => new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0
      }).format(row.precio)
    },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, row) => /* @__PURE__ */ jsx(
        TableActions,
        {
          onDelete: () => onDelete(row.id),
          onEdit: () => handleEdit(row)
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Table, { dataSource: propLibros, columns, loading, rowKey: "id" }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Editar libro",
        open: isModalOpen,
        onCancel: () => {
          setIsModalOpen(false);
          setEditingLibro(null);
        },
        footer: null,
        children: editingLibro && /* @__PURE__ */ jsxs(
          Form,
          {
            layout: "vertical",
            initialValues: editingLibro,
            onFinish: (values) => {
              const updatedLibro = { ...editingLibro, ...values };
              onUpdate(updatedLibro.id, updatedLibro);
              setIsModalOpen(false);
              setEditingLibro(null);
            },
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Título",
                  name: "titulo",
                  rules: [{ required: true, message: "Ingresa el título" }],
                  children: /* @__PURE__ */ jsx(Input, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Autor",
                  name: "autor",
                  rules: [{ required: true, message: "Ingresa el autor" }],
                  children: /* @__PURE__ */ jsx(Input, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Año",
                  name: "anio",
                  rules: [{ required: true, message: "Ingresa el año" }],
                  children: /* @__PURE__ */ jsx(InputNumber, { min: 0, style: { width: "100%" } })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Categoría",
                  name: "categoria",
                  rules: [{ required: true, message: "Ingresa la categoría" }],
                  children: /* @__PURE__ */ jsx(Input, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "ISBN",
                  name: "isbn",
                  rules: [{ required: true, message: "Ingresa el ISBN" }],
                  children: /* @__PURE__ */ jsx(Input, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Imagen (URL portada)",
                  name: "imagen",
                  rules: [{ required: true, message: "Ingresa una URL de imagen" }],
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "https://covers.openlibrary.org/b/id/xxxx.jpg" })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Precio",
                  name: "precio",
                  rules: [{ required: true, message: "Ingresa el precio" }],
                  children: /* @__PURE__ */ jsx(InputNumber, { min: 0, style: { width: "100%" } })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Stock",
                  name: "stock",
                  rules: [{ required: true, message: "Ingresa el stock" }],
                  children: /* @__PURE__ */ jsx(InputNumber, { min: 0, style: { width: "100%" } })
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button$1, { type: "primary", htmlType: "submit", style: { width: "100%" }, children: "Guardar cambios" }) })
            ]
          }
        )
      }
    )
  ] });
}
const API_URL$1 = "/api/libros";
async function getLibros() {
  const res = await fetch(API_URL$1);
  if (!res.ok) throw new Error("Error al obtener libros");
  return res.json();
}
async function deleteLibro(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL$1}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  if (!res.ok) throw new Error("Error al eliminar libro");
}
async function updateLibro(id, libro) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL$1}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(libro)
  });
  if (!res.ok) throw new Error("Error al actualizar libro");
}
async function createLibro(libro) {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL$1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(libro)
  });
  if (!res.ok) throw new Error("Error al crear libro");
  return res.json();
}
function ModalBackdrop({ onClick }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute inset-0 bg-black/40",
      onClick
    }
  );
}
function LogoutDialog({
  onCancel,
  onConfirm
}) {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(ModalBackdrop, { onClick: onCancel }),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-white w-full max-w-sm p-6 rounded-lg shadow-lg z-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "¿Seguro que quieres cerrar sesión?" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: onCancel, children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { variant: "danger", onClick: onConfirm, children: "Sí, salir" })
      ] })
    ] })
  ] });
}
const admin = UNSAFE_withComponentProps(function AdminPage() {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarLogout, setMostrarLogout] = useState(false);
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    anio: void 0,
    precio: 0,
    stock: 0,
    categoria: "",
    isbn: ""
  });
  const [form] = Form.useForm();
  useEffect(() => {
    (async () => {
      try {
        const data = await getLibros();
        setLibros(data);
      } catch (err) {
        console.error("Error cargando libros:", err);
      }
    })();
  }, []);
  const eliminarLibro = async (id) => {
    try {
      await deleteLibro(id);
      setLibros((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error eliminando libro:", err);
    }
  };
  const handleCreate = async (values) => {
    try {
      const creado = await createLibro(values);
      setLibros((prev) => [...prev, creado]);
      setMostrarModal(false);
      form.resetFields();
      setNuevoLibro({
        titulo: "",
        autor: "",
        anio: void 0,
        precio: 0,
        stock: 0,
        categoria: "",
        isbn: ""
      });
    } catch (err) {
      console.error("Error creando libro:", err);
      throw err;
    }
  };
  const confirmarLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return /* @__PURE__ */ jsx(ProtectedRoute, {
    rolesPermitidos: ["ROLE_ADMIN"],
    children: /* @__PURE__ */ jsxs(AdminLayout, {
      children: [/* @__PURE__ */ jsx(HeaderAdmin, {
        onLogoutClick: () => setMostrarLogout(true)
      }), /* @__PURE__ */ jsx(Toolbar, {
        onAdd: () => setMostrarModal(true)
      }), /* @__PURE__ */ jsx(LibrosTable, {
        libros,
        onDelete: eliminarLibro,
        onUpdate: async (id, libro) => {
          try {
            await updateLibro(id, libro);
            setLibros((prev) => prev.map((l) => l.id === id ? libro : l));
          } catch (err) {
            console.error("Error actualizando libro desde tabla:", err);
          }
        },
        onCreate: async (partial) => {
          try {
            const creado = await createLibro(partial);
            setLibros((prev) => [...prev, creado]);
            return creado;
          } catch (err) {
            console.error("Error creando libro desde tabla:", err);
            throw err;
          }
        }
      }), mostrarModal && /* @__PURE__ */ jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [/* @__PURE__ */ jsx(ModalBackdrop, {
          onClick: () => setMostrarModal(false)
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl z-10 flex",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold mb-4",
            children: "Añadir Libro"
          }), /* @__PURE__ */ jsxs(Form, {
            form,
            layout: "vertical",
            initialValues: nuevoLibro,
            onFinish: handleCreate,
            children: [/* @__PURE__ */ jsx(Form.Item, {
              label: "Título",
              name: "titulo",
              rules: [{
                required: true,
                message: "Título requerido"
              }],
              children: /* @__PURE__ */ jsx(Input, {})
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "Autor",
              name: "autor",
              rules: [{
                required: true,
                message: "Autor requerido"
              }],
              children: /* @__PURE__ */ jsx(Input, {})
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "Año",
              name: "anio",
              rules: [{
                required: true,
                message: "Año requerido"
              }],
              children: /* @__PURE__ */ jsx(InputNumber, {
                min: 0,
                style: {
                  width: "100%"
                }
              })
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "Precio",
              name: "precio",
              rules: [{
                required: true,
                message: "Precio requerido"
              }],
              children: /* @__PURE__ */ jsx(InputNumber, {
                min: 0,
                style: {
                  width: "100%"
                }
              })
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "Stock",
              name: "stock",
              rules: [{
                required: true,
                message: "Stock requerido"
              }],
              children: /* @__PURE__ */ jsx(InputNumber, {
                min: 0,
                style: {
                  width: "100%"
                }
              })
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "Categoría",
              name: "categoria",
              rules: [{
                required: true,
                message: "Categoría requerida"
              }],
              children: /* @__PURE__ */ jsx(Input, {})
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "ISBN",
              name: "isbn",
              rules: [{
                required: true,
                message: "ISBN requerido"
              }],
              children: /* @__PURE__ */ jsx(Input, {})
            }), /* @__PURE__ */ jsx(Form.Item, {
              label: "Imagen (URL portada)",
              name: "imagen",
              rules: [{
                required: true,
                message: "Ingresa una URL de imagen"
              }],
              children: /* @__PURE__ */ jsx(Input, {
                placeholder: "https://covers.openlibrary.org/b/id/xxxx.jpg"
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-end gap-3 mt-4",
              children: [/* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                onClick: () => {
                  setMostrarModal(false);
                  form.resetFields();
                },
                children: "Cancelar"
              }), /* @__PURE__ */ jsx(Button, {
                type: "submit",
                children: "Guardar"
              })]
            })]
          })]
        })]
      }), mostrarLogout && /* @__PURE__ */ jsx(LogoutDialog, {
        onCancel: () => setMostrarLogout(false),
        onConfirm: confirmarLogout
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: admin
}, Symbol.toStringTag, { value: "Module" }));
const API_URL = "/api/ventas";
const crearVenta = async (ventaRequest) => {
  console.log("🔄 Enviando a:", API_URL);
  console.log("📝 Body:", JSON.stringify(ventaRequest));
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ventaRequest)
  });
  console.log("📡 Response status:", response.status);
  console.log("📡 Response ok:", response.ok);
  if (!response.ok) {
    const error = await response.text();
    console.error("❌ Error del servidor:", error);
    throw new Error(error || "Error al crear la venta");
  }
  const data = await response.json();
  console.log("✅ Data recibida:", data);
  return data;
};
const obtenerVentas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener las ventas");
  }
  return response.json();
};
const obtenerVentaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener la venta");
  }
  return response.json();
};
const obtenerVentasDelDia = async () => {
  const response = await fetch(`${API_URL}/hoy`);
  if (!response.ok) {
    throw new Error("Error al obtener las ventas del día");
  }
  return response.json();
};
const {
  Title: Title$3,
  Text: Text$4
} = Typography;
const ventas = UNSAFE_withComponentProps(function VentasAdmin() {
  const [ventas2, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    cargarVentas();
  }, []);
  const cargarVentas = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
      message.error("Error al cargar las ventas");
    } finally {
      setLoading(false);
    }
  };
  const cargarVentasDelDia = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentasDelDia();
      setVentas(data);
      message.success(`${data.length} ventas del día cargadas`);
    } catch (error) {
      console.error("Error al cargar ventas del día:", error);
      message.error("Error al cargar las ventas del día");
    } finally {
      setLoading(false);
    }
  };
  const verDetalle = (venta) => {
    setVentaSeleccionada(venta);
    setModalVisible(true);
  };
  const columns = [{
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80
  }, {
    title: "Fecha",
    dataIndex: "fechaVenta",
    key: "fechaVenta",
    render: (fecha) => new Date(fecha).toLocaleString("es-CL")
  }, {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (total) => /* @__PURE__ */ jsxs(Text$4, {
      strong: true,
      className: "text-green-600",
      children: ["$", total.toLocaleString("es-CL")]
    })
  }, {
    title: "Items",
    dataIndex: "detalles",
    key: "items",
    render: (detalles) => /* @__PURE__ */ jsxs(Tag, {
      color: "blue",
      children: [detalles.length, " libro(s)"]
    })
  }, {
    title: "Acciones",
    key: "acciones",
    render: (_, record) => /* @__PURE__ */ jsx(Button$1, {
      type: "primary",
      icon: /* @__PURE__ */ jsx(EyeOutlined, {}),
      onClick: () => verDetalle(record),
      size: "small",
      children: "Ver Detalle"
    })
  }];
  const detalleColumns = [{
    title: "Libro",
    dataIndex: ["libro", "titulo"],
    key: "libro"
  }, {
    title: "Autor",
    dataIndex: ["libro", "autor"],
    key: "autor"
  }, {
    title: "Cantidad",
    dataIndex: "cantidad",
    key: "cantidad"
  }, {
    title: "Precio Unit.",
    dataIndex: "precioUnitario",
    key: "precioUnitario",
    render: (precio) => `$${precio.toLocaleString("es-CL")}`
  }, {
    title: "Subtotal",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (subtotal) => `$${subtotal.toLocaleString("es-CL")}`
  }];
  const calcularTotalGeneral = () => {
    return ventas2.reduce((sum, venta) => sum + venta.total, 0);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "p-6 bg-gray-50 min-h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex justify-between items-center mb-6",
        children: [/* @__PURE__ */ jsx(Title$3, {
          level: 2,
          children: "Gestión de Ventas"
        }), /* @__PURE__ */ jsx(Space, {
          children: /* @__PURE__ */ jsx(Button$1, {
            icon: /* @__PURE__ */ jsx(ReloadOutlined, {}),
            onClick: cargarVentasDelDia,
            type: "default",
            children: "Ventas del Día"
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
        children: [/* @__PURE__ */ jsx(Card, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Text$4, {
              type: "secondary",
              children: "Total de Ventas"
            }), /* @__PURE__ */ jsx(Title$3, {
              level: 3,
              children: ventas2.length
            })]
          })
        }), /* @__PURE__ */ jsx(Card, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Text$4, {
              type: "secondary",
              children: "Total Recaudado"
            }), /* @__PURE__ */ jsxs(Title$3, {
              level: 3,
              className: "text-green-600",
              children: ["$", calcularTotalGeneral().toLocaleString("es-CL")]
            })]
          })
        }), /* @__PURE__ */ jsx(Card, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Text$4, {
              type: "secondary",
              children: "Libros Vendidos"
            }), /* @__PURE__ */ jsx(Title$3, {
              level: 3,
              children: ventas2.reduce((sum, v) => sum + v.detalles.reduce((s, d) => s + d.cantidad, 0), 0)
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsx(Table, {
          columns,
          dataSource: ventas2,
          rowKey: "id",
          loading,
          pagination: {
            pageSize: 10,
            showTotal: (total) => `Total: ${total} ventas`
          }
        })
      }), /* @__PURE__ */ jsx(Modal, {
        title: `Detalle de Venta #${ventaSeleccionada?.id}`,
        open: modalVisible,
        onCancel: () => setModalVisible(false),
        footer: [/* @__PURE__ */ jsx(Button$1, {
          onClick: () => setModalVisible(false),
          children: "Cerrar"
        }, "close")],
        width: 800,
        children: ventaSeleccionada && /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs(Space, {
            direction: "vertical",
            className: "w-full mb-4",
            children: [/* @__PURE__ */ jsxs(Text$4, {
              children: [/* @__PURE__ */ jsx("strong", {
                children: "Fecha:"
              }), " ", new Date(ventaSeleccionada.fechaVenta).toLocaleString("es-CL")]
            }), /* @__PURE__ */ jsxs(Text$4, {
              children: [/* @__PURE__ */ jsx("strong", {
                children: "Total:"
              }), " $", ventaSeleccionada.total.toLocaleString("es-CL")]
            })]
          }), /* @__PURE__ */ jsx(Table, {
            columns: detalleColumns,
            dataSource: ventaSeleccionada.detalles,
            rowKey: "id",
            pagination: false
          })]
        })
      })]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ventas
}, Symbol.toStringTag, { value: "Module" }));
const CART_KEY = "cart";
function readCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error leyendo carrito:", err);
    return [];
  }
}
function saveCart(items) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    try {
      window.dispatchEvent(new Event("cart-changed"));
    } catch (e) {
    }
  } catch (err) {
    console.error("Error guardando carrito:", err);
  }
}
function getCart() {
  return readCart();
}
function addToCart(libro, cantidad = 1) {
  const items = readCart();
  const idx = items.findIndex((i) => i.libro.id === libro.id);
  if (idx >= 0) {
    items[idx].cantidad += cantidad;
    if (items[idx].cantidad < 1) items[idx].cantidad = 1;
  } else {
    items.push({ libro, cantidad });
  }
  saveCart(items);
  return items;
}
function clearCart() {
  saveCart([]);
}
const { Title: Title$2, Text: Text$3 } = Typography;
const { Search } = Input;
function Catalogo() {
  const [filtroTexto, setFiltroTexto] = useState("");
  const [categorias, setCategorias] = useState(null);
  const [dbLibros, setDbLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const navigate = useNavigate$1();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getLibros();
        setDbLibros(data);
      } catch (err) {
        console.error("Error fetching libros:", err);
        message.error("No se pudieron cargar los libros desde el servidor.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const libros = dbLibros;
  const filtrados = libros.filter((libro) => {
    const matchTexto = libro.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) || libro.autor.toLowerCase().includes(filtroTexto.toLowerCase());
    return matchTexto;
  });
  const start = (page - 1) * pageSize;
  const paginated = filtrados.slice(start, start + pageSize);
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen bg-[#EEEEEE] px-10 py-10", children: [
    /* @__PURE__ */ jsx(Title$2, { level: 2, className: "text-center !mb-8", children: "Catálogo de Libros" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 shadow-md rounded-xl mb-10 flex flex-wrap gap-4 items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Space, { size: "large", wrap: true, children: [
        /* @__PURE__ */ jsx(
          Search,
          {
            placeholder: "Buscar por título o autor",
            allowClear: true,
            onSearch: (value) => {
              setFiltroTexto(value);
              setPage(1);
            },
            style: { width: 280 }
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            placeholder: "Categorías",
            style: { width: 180 },
            onChange: (v) => {
              setCategorias(v);
              setPage(1);
            },
            defaultValue: "all",
            options: [
              { label: "Todas", value: "all" },
              { label: "Novela", value: "novela" },
              { label: "Clásicos", value: "clasicos" },
              { label: "Fantasia", value: "fantasia" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button$1, { type: "primary", onClick: () => navigate("/carrito"), size: "large", children: "Ver carrito" })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Row, { gutter: [20, 25], children: paginated.map((libro) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 8, lg: 8, xl: 8, children: /* @__PURE__ */ jsx(
        Card,
        {
          hoverable: true,
          className: "shadow-md hover:shadow-xl transition-all rounded-lg bg-white h-full",
          bodyStyle: { padding: 0 },
          children: /* @__PURE__ */ jsxs("div", { className: "flex h-full", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[110px] h-[160px] rounded-l-lg overflow-hidden bg-gray-100 flex-shrink-0", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: libro.imagen,
                className: "w-full h-full object-cover",
                alt: libro.titulo
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 flex flex-col justify-between h-full w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-h-[90px] flex flex-col", children: [
                /* @__PURE__ */ jsx(Title$2, { level: 5, className: "!mb-1 !text-base line-clamp-2", children: libro.titulo }),
                /* @__PURE__ */ jsx(Text$3, { type: "secondary", className: "block !text-xs line-clamp-1", children: libro.autor }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
                  /* @__PURE__ */ jsx(Tag, { color: "green", children: "Envío gratis" }),
                  /* @__PURE__ */ jsx(Tag, { color: "blue", children: "Nuevo" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(Title$2, { level: 4, className: "!mt-1 !text-lg text-[#008000]", children: [
                  "$",
                  libro.precio
                ] }),
                /* @__PURE__ */ jsx(
                  Button$1,
                  {
                    className: "w-full bg-[#FFE600] hover:bg-[#f5d800] text-black font-medium border-none mt-2",
                    onClick: () => {
                      if (typeof window !== "undefined") {
                        addToCart(libro, 1);
                        message.success("Libro añadido al carrito");
                      }
                    },
                    children: "Añadir al Carrito"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button$1,
                  {
                    type: "default",
                    className: "w-full mt-2",
                    onClick: () => navigate(`/catalogo/${libro.id}`),
                    children: "Ver detalle"
                  }
                )
              ] })
            ] })
          ] })
        }
      ) }, libro.id)) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10", children: /* @__PURE__ */ jsx(
        Pagination,
        {
          current: page,
          pageSize,
          total: filtrados.length,
          onChange: (p) => setPage(p),
          showSizeChanger: false
        }
      ) })
    ] })
  ] });
}
function UserHeader() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate$1();
  useEffect(() => {
    const update = () => {
      const items = getCart();
      const total = items.reduce((s, it) => s + it.cantidad, 0);
      setCount(total);
    };
    update();
    window.addEventListener("cart-changed", update);
    return () => window.removeEventListener("cart-changed", update);
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: "w-full bg-white shadow-md py-3 px-4 flex items-center justify-between sticky top-0 z-50", children: [
    /* @__PURE__ */ jsx(
      Button$1,
      {
        type: "text",
        icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, { style: { fontSize: 20 } }),
        onClick: () => navigate(-1),
        className: "flex items-center text-gray-600 hover:text-black"
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2", children: "Tienda de Libros" }),
    /* @__PURE__ */ jsx(Badge, { count, offset: [0, 6], children: /* @__PURE__ */ jsx(
      Button$1,
      {
        type: "text",
        onClick: () => navigate("/carrito"),
        icon: /* @__PURE__ */ jsx(ShoppingCartOutlined, { style: { fontSize: 22 } }),
        className: "flex items-center text-gray-600 hover:text-black"
      }
    ) })
  ] });
}
function UserLayout({ children }) {
  useNavigate$1();
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full bg-gray-50 p-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx(UserHeader, {}) }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 bg-white rounded-xl shadow-sm p-6", children })
  ] }) });
}
const usuario = UNSAFE_withComponentProps(function UsuarioPage() {
  return /* @__PURE__ */ jsx(ProtectedRoute, {
    rolesPermitidos: ["ROLE_USER"],
    children: /* @__PURE__ */ jsx(UserLayout, {
      children: /* @__PURE__ */ jsx(Catalogo, {})
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: usuario
}, Symbol.toStringTag, { value: "Module" }));
const home = UNSAFE_withComponentProps(function Home() {
  const user = getUserFromToken();
  if (!user) return /* @__PURE__ */ jsx(Navigate, {
    to: "/login",
    replace: true
  });
  if (user.roles?.includes("ROLE_ADMIN")) return /* @__PURE__ */ jsx(Navigate, {
    to: "/admin",
    replace: true
  });
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/usuario",
    replace: true
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const {
  Title: Title$1,
  Text: Text$2,
  Paragraph
} = Typography;
const librosMock = [{
  id: 1,
  titulo: "Cien Años de Soledad",
  autor: "Gabriel García Márquez",
  precio: 19990,
  imagen: "https://covers.openlibrary.org/b/id/10245614-L.jpg",
  stock: 10,
  descripcion: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo."
}, {
  id: 2,
  titulo: "Don Quijote de la Mancha",
  autor: "Miguel de Cervantes",
  precio: 12500,
  imagen: "https://covers.openlibrary.org/b/id/10501867-L.jpg",
  stock: 10,
  descripcion: "La novela más influyente de la literatura española, que sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza."
}, {
  id: 3,
  titulo: "La Sombra del Viento",
  autor: "Carlos Ruiz Zafón",
  precio: 18e3,
  imagen: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
  stock: 10,
  descripcion: "Un joven descubre un libro maldito que cambiará su vida para siempre en la Barcelona de la posguerra."
}, {
  id: 4,
  titulo: "El Amor en los Tiempos del Cólera",
  autor: "Gabriel García Márquez",
  precio: 2e4,
  imagen: "https://covers.openlibrary.org/b/id/10333850-L.jpg",
  stock: 10,
  descripcion: "Una historia de amor que perdura más de medio siglo, explorando la naturaleza del amor en todas sus formas."
}, {
  id: 5,
  titulo: "Ficciones",
  autor: "Jorge Luis Borges",
  precio: 15500,
  imagen: "https://covers.openlibrary.org/b/id/8319256-L.jpg",
  stock: 10,
  descripcion: "Una colección de cuentos que desafían la realidad y exploran laberintos metafísicos."
}];
const detalleLibro = UNSAFE_withComponentProps(function DetalleLibro() {
  const {
    id
  } = useParams();
  const navigate = useNavigate$1();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const libroId = parseInt(id || "0");
        const libroMock = librosMock.find((l) => l.id === libroId);
        if (libroMock) {
          setLibro(libroMock);
          setLoading(false);
          return;
        }
        try {
          const dbLibros = await getLibros();
          const libroDb = dbLibros.find((l) => l.id === libroId);
          if (libroDb) {
            setLibro(libroDb);
          } else {
            message.error("Libro no encontrado");
          }
        } catch (apiError) {
          console.error("Error fetching from API:", apiError);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchLibro();
    }
  }, [id]);
  const handleAddToCart = () => {
    if (libro && typeof window !== "undefined") {
      addToCart(libro, cantidad);
      message.success(`${cantidad} libro(s) añadido(s) al carrito`);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center h-screen bg-gray-100",
      children: /* @__PURE__ */ jsx(Spin, {
        size: "large",
        tip: "Cargando libro..."
      })
    });
  }
  if (!libro) {
    return /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen bg-gray-100 flex flex-col items-center justify-center",
      children: [/* @__PURE__ */ jsx(Title$1, {
        level: 3,
        children: "Libro no encontrado"
      }), /* @__PURE__ */ jsx(Button$1, {
        type: "primary",
        icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, {}),
        onClick: () => navigate("/usuario"),
        className: "mt-4",
        children: "Volver al catálogo"
      })]
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-[#EEEEEE] px-6 md:px-12 py-10",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto",
      children: [/* @__PURE__ */ jsx(Button$1, {
        icon: /* @__PURE__ */ jsx(ArrowLeftOutlined, {}),
        onClick: () => navigate("/usuario"),
        className: "mb-6",
        size: "large",
        children: "Volver al catálogo"
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-10",
        children: [/* @__PURE__ */ jsx(Card, {
          className: "shadow-lg rounded-xl",
          cover: /* @__PURE__ */ jsx("div", {
            className: "bg-white p-8 flex items-center justify-center",
            children: /* @__PURE__ */ jsx("img", {
              src: libro.imagen || "https://via.placeholder.com/350x500",
              alt: libro.titulo,
              className: "object-contain w-full max-h-[500px] rounded-xl"
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "bg-white p-8 rounded-xl shadow-lg",
          children: [/* @__PURE__ */ jsx(Title$1, {
            level: 2,
            className: "!mb-2",
            children: libro.titulo
          }), /* @__PURE__ */ jsxs(Text$2, {
            className: "text-lg text-gray-600",
            children: ["por ", libro.autor]
          }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsxs("div", {
            className: "my-6",
            children: [/* @__PURE__ */ jsxs(Title$1, {
              level: 2,
              className: "!text-[#008000] !mb-2",
              children: ["$", libro.precio.toLocaleString("es-CL")]
            }), /* @__PURE__ */ jsxs(Space, {
              size: "small",
              className: "mb-4",
              children: [/* @__PURE__ */ jsx(Tag, {
                color: "green",
                children: "✔ En Stock"
              }), /* @__PURE__ */ jsx(Tag, {
                color: "blue",
                children: "Envío gratis"
              }), /* @__PURE__ */ jsx(Tag, {
                color: "gold",
                children: "Nuevo"
              })]
            })]
          }), /* @__PURE__ */ jsxs(Space, {
            direction: "vertical",
            size: "large",
            className: "w-full",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx(Text$2, {
                strong: true,
                className: "block mb-2",
                children: "Cantidad:"
              }), /* @__PURE__ */ jsx(InputNumber, {
                min: 1,
                max: libro.stock || 10,
                value: cantidad,
                onChange: (val) => setCantidad(val || 1),
                size: "large",
                className: "w-32"
              })]
            }), /* @__PURE__ */ jsxs(Space, {
              size: "middle",
              className: "w-full",
              direction: "vertical",
              children: [/* @__PURE__ */ jsx(Button$1, {
                type: "primary",
                size: "large",
                className: "w-full bg-[#FFE600] hover:bg-[#f5d800] text-black font-medium border-none",
                onClick: handleAddToCart,
                children: "Añadir al Carrito"
              }), /* @__PURE__ */ jsx(Button$1, {
                size: "large",
                className: "w-full",
                onClick: () => navigate("/carrito"),
                children: "Ir al Carrito"
              })]
            })]
          }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx(Title$1, {
              level: 4,
              children: "Descripción"
            }), /* @__PURE__ */ jsx(Paragraph, {
              className: "text-gray-700 leading-relaxed",
              children: "Un libro muy bueno recomendado por nosotros."
            })]
          })]
        })]
      })]
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: detalleLibro
}, Symbol.toStringTag, { value: "Module" }));
function RegisterForm() {
  const navigate = useNavigate$1();
  const handleFinish = async (values) => {
    try {
      if (values.contrasenia !== values.confirmar) {
        message.error("Las contraseñas no coinciden");
        return;
      }
      await registerUser({ nombre: values.nombre, correo: values.correo, contrasenia: values.contrasenia });
      message.success("La cuenta ha sido creada");
      navigate("/");
    } catch (err) {
      message.error(err.message || "Error registrando la cuenta");
    }
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      style: {
        width: 380,
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      },
      children: [
        /* @__PURE__ */ jsx(
          Button$1,
          {
            type: "text",
            onClick: () => navigate(-1),
            icon: /* @__PURE__ */ jsx("span", { className: "mr-1", children: "←" }),
            style: {
              marginBottom: 16,
              padding: "4px 8px",
              borderRadius: 6,
              fontWeight: 500,
              color: "#374151",
              backgroundColor: "transparent"
            },
            className: "hover:bg-gray-100",
            children: "Volver"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black leading-tight", children: "Crear cuenta" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm", children: "Completa tus datos para registrarte" })
        ] }),
        /* @__PURE__ */ jsxs(Form, { layout: "vertical", onFinish: handleFinish, children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Nombre completo",
              name: "nombre",
              rules: [{ required: true }],
              children: /* @__PURE__ */ jsx(TextInput, { placeholder: "Ingresa tu nombre" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Correo",
              name: "correo",
              rules: [{ required: true }],
              children: /* @__PURE__ */ jsx(TextInput, { placeholder: "Ingresa tu correo", type: "email" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Contraseña",
              name: "contrasenia",
              rules: [{ required: true }],
              children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "Ingresa tu contraseña" })
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Confirmar contraseña",
              name: "confirmar",
              rules: [{ required: true }],
              children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "Repite tu contraseña" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { text: "Registrarse" }) })
        ] })
      ]
    }
  );
}
const registro = UNSAFE_withComponentProps(function RegistroPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-screen",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex items-center justify-center flex-1 bg-gray-50",
      children: /* @__PURE__ */ jsx(RegisterForm, {})
    }), /* @__PURE__ */ jsx("div", {
      className: "hidden md:block flex-1",
      children: /* @__PURE__ */ jsx("img", {
        src: "/app/components/imgs/BibliotecaLogin2.jpg",
        alt: "Biblioteca",
        className: "w-full h-full object-cover"
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: registro
}, Symbol.toStringTag, { value: "Module" }));
function RecoverForm() {
  const navigate = useNavigate$1();
  const [step, setStep] = useState("email");
  const [correoConfirmado, setCorreoConfirmado] = useState(null);
  return /* @__PURE__ */ jsxs(
    Card,
    {
      style: {
        width: 380,
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => navigate(-1),
            className: "text-sm text-gray-600 hover:text-gray-900 mb-5",
            style: {
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            },
            children: "← Volver"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-black leading-tight", children: "Recuperar contraseña" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm", children: "Ingresa tu correo para enviarte un enlace de recuperación" })
        ] }),
        step === "email" && /* @__PURE__ */ jsxs(
          Form,
          {
            layout: "vertical",
            onFinish: async (values) => {
              try {
                await requestPasswordReset({ correo: values.correo });
                message.success("Si el correo existe, se ha enviado un enlace de recuperación.");
                setCorreoConfirmado(values.correo);
                setStep("reset");
              } catch (err) {
                message.error(err.message || "Error solicitando recuperación");
              }
            },
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Correo",
                  name: "correo",
                  rules: [{ required: true, type: "email", message: "Ingresa un correo válido" }],
                  children: /* @__PURE__ */ jsx(TextInput, { placeholder: "Ingresa tu correo", type: "email" })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { text: "Enviar enlace" }) })
            ]
          }
        ),
        step === "reset" && /* @__PURE__ */ jsxs(
          Form,
          {
            layout: "vertical",
            onFinish: async (values) => {
              try {
                if (!correoConfirmado) throw new Error("Correo no definido");
                if (values.password !== values.confirm) {
                  message.error("Las contraseñas no coinciden");
                  return;
                }
                await resetPassword({ correo: correoConfirmado, contrasenia: values.password });
                message.success("Contraseña actualizada correctamente");
                navigate("/");
              } catch (err) {
                message.error(err.message || "Error actualizando la contraseña");
              }
            },
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Nueva contraseña",
                  name: "password",
                  rules: [{ required: true, message: "Ingresa la nueva contraseña" }],
                  children: /* @__PURE__ */ jsx(TextInput, { placeholder: "Nueva contraseña", type: "password" })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Repetir contraseña",
                  name: "confirm",
                  rules: [{ required: true, message: "Repite la contraseña" }],
                  children: /* @__PURE__ */ jsx(TextInput, { placeholder: "Repite la contraseña", type: "password" })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { text: "Actualizar contraseña" }) })
            ]
          }
        )
      ]
    }
  );
}
const recuperar = UNSAFE_withComponentProps(function RecuperarPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-screen",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex items-center justify-center flex-1 bg-gray-50",
      children: /* @__PURE__ */ jsx(RecoverForm, {})
    }), /* @__PURE__ */ jsx("div", {
      className: "hidden md:block flex-1",
      children: /* @__PURE__ */ jsx("img", {
        src: "/app/components/imgs/BibliotecaLogin2.jpg",
        alt: "Biblioteca",
        className: "w-full h-full object-cover"
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: recuperar
}, Symbol.toStringTag, { value: "Module" }));
const { Text: Text$1 } = Typography;
function CartItemRow({ item, onQtyChange, onRemove }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0 bg-white", children: [
    /* @__PURE__ */ jsx("div", { style: { width: 72 }, children: /* @__PURE__ */ jsx(Image, { src: item.image, alt: item.title, width: 56, height: 80, preview: false }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-base text-gray-900", children: item.title }),
          item.author && /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: item.author })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-semibold text-gray-900", children: [
            "$",
            item.price.toLocaleString("es-CL")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
            "$",
            (item.price * item.qty).toLocaleString("es-CL")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex items-center justify-between", children: /* @__PURE__ */ jsxs(Space, { children: [
        /* @__PURE__ */ jsx(
          InputNumber,
          {
            min: 1,
            value: item.qty,
            onChange: (v) => onQtyChange(item.id, Number(v || 1))
          }
        ),
        /* @__PURE__ */ jsx(
          Button$1,
          {
            type: "link",
            danger: true,
            icon: /* @__PURE__ */ jsx(DeleteOutlined, {}),
            onClick: () => onRemove(item.id),
            children: "Eliminar"
          }
        )
      ] }) })
    ] })
  ] });
}
function CartTable({ items, onQtyChange, onRemove }) {
  if (!items || items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "p-6 bg-white dark:bg-[#0f1724] rounded border text-center", children: "Tu carrito está vacío." });
  }
  return /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-transparent rounded border", children: items.map((it) => /* @__PURE__ */ jsx(CartItemRow, { item: it, onQtyChange, onRemove }, it.id)) });
}
function CartSummary({ subtotal, onCheckout, loading = false }) {
  const envio = 5e3;
  const total = subtotal + envio;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-blue-600 p-6 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Resumen de Compra" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { children: "Subtotal:" }),
        /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
          "$",
          subtotal.toLocaleString("es-CL")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { children: "Envío:" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-green-600", children: "$5.000" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t pt-3 flex justify-between text-lg", children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Total:" }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-green-600", children: [
          "$",
          total.toLocaleString("es-CL")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onCheckout,
        disabled: loading,
        className: `
          w-full py-3 px-4 rounded-lg font-bold text-lg
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFE600] hover:bg-[#f5d800] text-black"}
          transition-colors
        `,
        children: loading ? "Procesando..." : "Finalizar Compra"
      }
    )
  ] });
}
const carrito = UNSAFE_withComponentProps(function CarritoPage() {
  const navigate = useNavigate$1();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setItems(getCart());
  }, []);
  useEffect(() => {
    if (mounted) {
      saveCart(items);
    }
  }, [items, mounted]);
  const displayItems = useMemo(() => {
    return items.map((it) => ({
      id: String(it.libro.id),
      title: it.libro.titulo,
      author: it.libro.autor,
      price: it.libro.precio,
      qty: it.cantidad,
      image: it.libro.imagen
    }));
  }, [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.libro.precio * it.cantidad, 0), [items]);
  function handleQtyChange(id, qty) {
    const libroId = Number(id);
    setItems((prev) => prev.map((it) => it.libro.id === libroId ? {
      ...it,
      cantidad: qty
    } : it));
    message.success("Cantidad actualizada");
  }
  function handleRemove(id) {
    const libroId = Number(id);
    setItems((prev) => prev.filter((it) => it.libro.id !== libroId));
    message.success("Producto eliminado");
  }
  async function handleCheckout() {
    if (items.length === 0) {
      message.warning("El carrito está vacío");
      return;
    }
    Modal.confirm({
      title: "¿Confirmar compra?",
      content: `Total a pagar: $${subtotal.toLocaleString("es-CL")}`,
      okText: "Confirmar",
      cancelText: "Cancelar",
      onOk: async () => {
        setLoading(true);
        try {
          const ventaRequest = {
            items: items.map((item) => ({
              libroId: item.libro.id,
              cantidad: item.cantidad,
              precio: item.libro.precio
            })),
            total: subtotal
          };
          console.log("📦 Request a enviar:", ventaRequest);
          const venta = await crearVenta(ventaRequest);
          console.log(" Venta creada:", venta);
          clearCart();
          setItems([]);
          message.success(`¡Compra realizada exitosamente! Número de venta: ${venta.id}`);
          navigate(`/confirmacionVenta/${venta.id}`);
        } catch (error) {
          console.error("❌ Error completo:", error);
          console.error("❌ Error message:", error.message);
          message.error(error.message || "Error al procesar la compra. Intenta nuevamente.");
        } finally {
          setLoading(false);
        }
      }
    });
  }
  if (!mounted) {
    return /* @__PURE__ */ jsx(UserLayout, {
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 py-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "flex justify-center items-center h-64",
          children: "Cargando carrito..."
        })
      })
    });
  }
  return /* @__PURE__ */ jsx(UserLayout, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 py-8",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex justify-between items-center mb-6",
        children: /* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-extrabold text-gray-900",
          children: "Mi Carrito de Compras"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "lg:col-span-2",
          children: [/* @__PURE__ */ jsx(CartTable, {
            items: displayItems,
            onQtyChange: handleQtyChange,
            onRemove: handleRemove
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex gap-3 mt-4",
            children: [/* @__PURE__ */ jsx("button", {
              className: "px-4 py-2 rounded bg-gray-200 dark:bg-blue-600 font-bold",
              onClick: () => navigate("/usuario"),
              children: "Continuar Comprando"
            }), /* @__PURE__ */ jsx("button", {
              className: "x-4 py-2 rounded bg-gray-200 dark:bg-gray-700 font-bold",
              onClick: () => message.info("Cantidades actualizadas"),
              children: "Actualizar Cantidades"
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(CartSummary, {
            subtotal,
            onCheckout: handleCheckout,
            loading
          })
        })]
      })]
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: carrito
}, Symbol.toStringTag, { value: "Module" }));
const {
  Title,
  Text
} = Typography;
const confirmacionVenta = UNSAFE_withComponentProps(function ConfirmacionVenta() {
  const {
    id
  } = useParams();
  const navigate = useNavigate$1();
  const [venta, setVenta] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cargarVenta = async () => {
      try {
        if (id) {
          const data = await obtenerVentaPorId(parseInt(id));
          setVenta(data);
        }
      } catch (error) {
        console.error("Error al cargar la venta:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarVenta();
  }, [id]);
  const calcularPrecioSinIVA = (precioConIVA) => {
    return precioConIVA / 1.19;
  };
  const calcularIVA = (precioConIVA) => {
    return precioConIVA - calcularPrecioSinIVA(precioConIVA);
  };
  const imprimirBoleta = () => {
    window.print();
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center h-screen",
      children: /* @__PURE__ */ jsx(Spin, {
        size: "large"
      })
    });
  }
  if (!venta) {
    return /* @__PURE__ */ jsx(Result, {
      status: "404",
      title: "Venta no encontrada",
      extra: /* @__PURE__ */ jsx(Button$1, {
        type: "primary",
        onClick: () => navigate("/catalogo"),
        children: "Volver al catálogo"
      })
    });
  }
  const subtotalSinIVA = venta.detalles.reduce((sum, detalle) => sum + calcularPrecioSinIVA(detalle.subtotal), 0);
  const totalIVA = venta.detalles.reduce((sum, detalle) => sum + calcularIVA(detalle.subtotal), 0);
  const columns = [{
    title: "Libro",
    dataIndex: ["libro", "titulo"],
    key: "titulo"
  }, {
    title: "Autor",
    dataIndex: ["libro", "autor"],
    key: "autor"
  }, {
    title: "Cantidad",
    dataIndex: "cantidad",
    key: "cantidad",
    align: "center"
  }, {
    title: "Precio Unit. (sin IVA)",
    key: "precioSinIVA",
    align: "right",
    render: (_, record) => `$${calcularPrecioSinIVA(record.precioUnitario).toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`
  }, {
    title: "IVA (19%)",
    key: "iva",
    align: "right",
    render: (_, record) => `$${calcularIVA(record.precioUnitario * record.cantidad).toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`
  }, {
    title: "Subtotal",
    dataIndex: "subtotal",
    key: "subtotal",
    align: "right",
    render: (subtotal) => `$${subtotal.toLocaleString("es-CL")}`
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-[#EEEEEE] px-6 md:px-12 py-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto",
      children: [/* @__PURE__ */ jsx(Result, {
        status: "success",
        icon: /* @__PURE__ */ jsx(CheckCircleOutlined, {
          style: {
            color: "#52c41a"
          }
        }),
        title: "¡Compra realizada exitosamente!",
        subTitle: `Número de boleta: ${venta.id} - Fecha: ${new Date(venta.fechaVenta).toLocaleString("es-CL")}`
      }), /* @__PURE__ */ jsxs(Card, {
        className: "shadow-lg mt-6",
        id: "boleta-content",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center border-b pb-4 mb-4",
          children: [/* @__PURE__ */ jsx(Title, {
            level: 3,
            className: "!mb-1",
            children: "Librería El literario sentimental"
          }), /* @__PURE__ */ jsx(Text, {
            type: "secondary",
            children: "RUT: 23.232.777-5"
          }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx(Text, {
            type: "secondary",
            children: "Dirección: Av. Enanas chicas 140, Santiago"
          }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx(Text, {
            type: "secondary",
            children: "Teléfono: +56 2 2323 7772"
          }), /* @__PURE__ */ jsx(Divider, {
            className: "!my-3"
          }), /* @__PURE__ */ jsx(Title, {
            level: 4,
            className: "!mb-0",
            children: "BOLETA ELECTRÓNICA"
          }), /* @__PURE__ */ jsxs(Text, {
            strong: true,
            children: ["N° ", venta.id.toString().padStart(8, "0")]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mb-4",
          children: /* @__PURE__ */ jsxs(Text, {
            children: [/* @__PURE__ */ jsx("strong", {
              children: "Fecha:"
            }), " ", new Date(venta.fechaVenta).toLocaleString("es-CL", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })]
          })
        }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsx(Title, {
          level: 4,
          children: "Detalle de la Compra"
        }), /* @__PURE__ */ jsx(Table, {
          dataSource: venta.detalles,
          columns,
          pagination: false,
          rowKey: "id",
          size: "small"
        }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsx("div", {
          className: "flex justify-end",
          children: /* @__PURE__ */ jsxs("div", {
            className: "w-full md:w-1/2",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex justify-between mb-2",
              children: [/* @__PURE__ */ jsx(Text, {
                children: "Subtotal (sin IVA):"
              }), /* @__PURE__ */ jsxs(Text, {
                strong: true,
                children: ["$", subtotalSinIVA.toLocaleString("es-CL", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between mb-2",
              children: [/* @__PURE__ */ jsx(Text, {
                children: "IVA (19%):"
              }), /* @__PURE__ */ jsxs(Text, {
                strong: true,
                children: ["$", totalIVA.toLocaleString("es-CL", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })]
              })]
            }), /* @__PURE__ */ jsx(Divider, {
              className: "!my-2"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between",
              children: [/* @__PURE__ */ jsx(Title, {
                level: 4,
                className: "!mb-0",
                children: "TOTAL:"
              }), /* @__PURE__ */ jsxs(Title, {
                level: 4,
                className: "!mb-0 text-green-600",
                children: ["$", venta.total.toLocaleString("es-CL")]
              })]
            })]
          })
        }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsx("div", {
          className: "text-center text-gray-500",
          children: /* @__PURE__ */ jsxs(Text, {
            type: "secondary",
            className: "text-xs",
            children: ["¡Gracias por su compra!", /* @__PURE__ */ jsx("br", {}), "Esta boleta es válida como documento tributario electrónico"]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-center gap-4 mt-8 print:hidden",
        children: [/* @__PURE__ */ jsx(Button$1, {
          size: "large",
          icon: /* @__PURE__ */ jsx(PrinterOutlined, {}),
          onClick: imprimirBoleta,
          children: "Imprimir Boleta"
        }), /* @__PURE__ */ jsx(Button$1, {
          type: "primary",
          size: "large",
          icon: /* @__PURE__ */ jsx(HomeOutlined, {}),
          onClick: () => navigate("/usuario"),
          children: "Volver al Catálogo"
        })]
      })]
    }), /* @__PURE__ */ jsx("style", {
      children: `
        @media print {
          body * {
            visibility: hidden;
          }
          #boleta-content, #boleta-content * {
            visibility: visible;
          }
          #boleta-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: confirmacionVenta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BesTAyhm.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/index-BkD47wbt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BZ98_M7Q.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/index-BkD47wbt.js"], "css": ["/assets/root-C3ghwYyl.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-DmaQbYui.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/api-CoxdaipU.js", "/assets/index-CdKnKaQ3.js", "/assets/index-Tu1yVz4p.js", "/assets/index-DXFhQDTa.js", "/assets/EyeOutlined-DTJrb2Fx.js", "/assets/auth-k2MjSDqw.js", "/assets/index-BNYyyMCE.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-BkD47wbt.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/useForm-Cmw-R4aR.js", "/assets/index-a3La0MQV.js", "/assets/Input-BTma9NQ7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin": { "id": "routes/admin", "parentId": "root", "path": "admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/admin-C2tWXI1j.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/ProtectedRoute-DsIm_Tak.js", "/assets/Table-C7lqLG0z.js", "/assets/index-CXZ2mttz.js", "/assets/index-Tu1yVz4p.js", "/assets/index-DXFhQDTa.js", "/assets/index-iSoP9dlm.js", "/assets/TextArea-B4gYReTu.js", "/assets/LibrosApi-DH1cyyJr.js", "/assets/auth-k2MjSDqw.js", "/assets/index-BkD47wbt.js", "/assets/Pagination-DXncGRiP.js", "/assets/LeftOutlined-NAWUrKY4.js", "/assets/Input-BTma9NQ7.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/DownOutlined-CznQ8fDI.js", "/assets/useForm-Cmw-R4aR.js", "/assets/index-COy0Xq0Z.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/index-a3La0MQV.js", "/assets/useClosable-Dll-q-9Y.js", "/assets/EyeOutlined-DTJrb2Fx.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/ventas": { "id": "routes/ventas", "parentId": "root", "path": "/admin/ventas", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ventas-8pEguBFU.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/VentasApi-B_0J9QRC.js", "/assets/index-BJZZufhX.js", "/assets/index-BNYyyMCE.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-CdKnKaQ3.js", "/assets/Table-C7lqLG0z.js", "/assets/index-CXZ2mttz.js", "/assets/index-Cf4WG2iw.js", "/assets/EyeOutlined-DTJrb2Fx.js", "/assets/DownOutlined-CznQ8fDI.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/index-BkD47wbt.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/Pagination-DXncGRiP.js", "/assets/LeftOutlined-NAWUrKY4.js", "/assets/Input-BTma9NQ7.js", "/assets/useForm-Cmw-R4aR.js", "/assets/index-COy0Xq0Z.js", "/assets/index-a3La0MQV.js", "/assets/useClosable-Dll-q-9Y.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/usuario": { "id": "routes/usuario", "parentId": "root", "path": "usuario", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/usuario-DdVOLqty.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/ProtectedRoute-DsIm_Tak.js", "/assets/LibrosApi-DH1cyyJr.js", "/assets/cart-BGbotYTr.js", "/assets/index-BJZZufhX.js", "/assets/index-DXFhQDTa.js", "/assets/index-BNYyyMCE.js", "/assets/TextArea-B4gYReTu.js", "/assets/Pagination-DXncGRiP.js", "/assets/index-COy0Xq0Z.js", "/assets/index-CdKnKaQ3.js", "/assets/index-Cf4WG2iw.js", "/assets/UserLayout-BF748j9B.js", "/assets/auth-k2MjSDqw.js", "/assets/DownOutlined-CznQ8fDI.js", "/assets/index-a3La0MQV.js", "/assets/Input-BTma9NQ7.js", "/assets/EyeOutlined-DTJrb2Fx.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/index-BkD47wbt.js", "/assets/LeftOutlined-NAWUrKY4.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/useClosable-Dll-q-9Y.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-k__JLwLt.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/auth-k2MjSDqw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/detalleLibro": { "id": "routes/detalleLibro", "parentId": "root", "path": "/catalogo/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/detalleLibro-CA1UxEga.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/LibrosApi-DH1cyyJr.js", "/assets/cart-BGbotYTr.js", "/assets/index-BJZZufhX.js", "/assets/index-COy0Xq0Z.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-CdKnKaQ3.js", "/assets/index-CB7Tqvpr.js", "/assets/index-Cf4WG2iw.js", "/assets/index-iSoP9dlm.js", "/assets/index-BNYyyMCE.js", "/assets/DownOutlined-CznQ8fDI.js", "/assets/index-BkD47wbt.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/useClosable-Dll-q-9Y.js", "/assets/CSSMotionList-DZf0MpMu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/registro": { "id": "routes/registro", "parentId": "root", "path": "registro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/registro-B2faFl-5.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/api-CoxdaipU.js", "/assets/index-CdKnKaQ3.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-Tu1yVz4p.js", "/assets/index-DXFhQDTa.js", "/assets/index-BNYyyMCE.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/index-BkD47wbt.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/useForm-Cmw-R4aR.js", "/assets/index-a3La0MQV.js", "/assets/Input-BTma9NQ7.js", "/assets/EyeOutlined-DTJrb2Fx.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/recuperar": { "id": "routes/recuperar", "parentId": "root", "path": "recuperar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/recuperar-Brivr5eE.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/api-CoxdaipU.js", "/assets/index-CdKnKaQ3.js", "/assets/index-Tu1yVz4p.js", "/assets/index-BNYyyMCE.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-BkD47wbt.js", "/assets/index-DXFhQDTa.js", "/assets/index-a3La0MQV.js", "/assets/Input-BTma9NQ7.js", "/assets/EyeOutlined-DTJrb2Fx.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/useForm-Cmw-R4aR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/carrito": { "id": "routes/carrito", "parentId": "root", "path": "carrito", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/carrito-Bhwr0lyX.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/UserLayout-BF748j9B.js", "/assets/index-BJZZufhX.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-CXZ2mttz.js", "/assets/LeftOutlined-NAWUrKY4.js", "/assets/index-iSoP9dlm.js", "/assets/cart-BGbotYTr.js", "/assets/VentasApi-B_0J9QRC.js", "/assets/index-BNYyyMCE.js", "/assets/DownOutlined-CznQ8fDI.js", "/assets/index-BkD47wbt.js", "/assets/CSSMotionList-DZf0MpMu.js", "/assets/index-a3La0MQV.js", "/assets/useClosable-Dll-q-9Y.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/confirmacionVenta": { "id": "routes/confirmacionVenta", "parentId": "root", "path": "confirmacionVenta/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/confirmacionVenta-1b4mWx7O.js", "imports": ["/assets/chunk-4WY6JWTD-BQxbebXW.js", "/assets/VentasApi-B_0J9QRC.js", "/assets/index-BJZZufhX.js", "/assets/index-COy0Xq0Z.js", "/assets/TextArea-B4gYReTu.js", "/assets/index-CdKnKaQ3.js", "/assets/index-CB7Tqvpr.js", "/assets/Table-C7lqLG0z.js", "/assets/DownOutlined-CznQ8fDI.js", "/assets/index-BkD47wbt.js", "/assets/EllipsisOutlined-FzZZHGxd.js", "/assets/Pagination-DXncGRiP.js", "/assets/LeftOutlined-NAWUrKY4.js", "/assets/Input-BTma9NQ7.js", "/assets/useForm-Cmw-R4aR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-f46c5480.js", "version": "f46c5480", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/ventas": {
    id: "routes/ventas",
    parentId: "root",
    path: "/admin/ventas",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/usuario": {
    id: "routes/usuario",
    parentId: "root",
    path: "usuario",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/detalleLibro": {
    id: "routes/detalleLibro",
    parentId: "root",
    path: "/catalogo/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/registro": {
    id: "routes/registro",
    parentId: "root",
    path: "registro",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/recuperar": {
    id: "routes/recuperar",
    parentId: "root",
    path: "recuperar",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/carrito": {
    id: "routes/carrito",
    parentId: "root",
    path: "carrito",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/confirmacionVenta": {
    id: "routes/confirmacionVenta",
    parentId: "root",
    path: "confirmacionVenta/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
