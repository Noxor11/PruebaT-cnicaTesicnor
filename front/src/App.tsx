
type AppProps = {
  children: React.ReactNode;
};

function App({ children }: AppProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
}

export default App;
