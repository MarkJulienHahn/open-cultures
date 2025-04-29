export const metadata = {
  title: "Backend | Open Cultures",
  description: "Welcome to the Backend of Open Cultures",
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
