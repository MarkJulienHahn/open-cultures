export const metadata = {
  title: "Backend | OpenCultures",
  description: "Welcome to the Backend of OpenCultures",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <div className="admin-layout">{children}</div>
      </body>
    </html>
  );
}
