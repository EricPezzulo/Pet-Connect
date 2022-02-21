import Header from "../components/Header";
import Layout from "../components/Layout";

function test() {
  return (
    <TestLayout>
      <div className="flex bg-blue-300">something</div>
      <div className="flex bg-red-300">something else</div>
      <div className="flex bg-green-300">something third</div>
    </TestLayout>
  );
}

export const TestLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-purple-200">
      <div className="flex bg-red-400">
        <Header />
      </div>
      <div className="flex flex-col flex-1">{children}</div>
      <div className="flex bg-yellow-300">
        <Footer />
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full border-t-2 border-purple-800 h-14 bg-purple-600">
      <p className="text-lg font-medium text-white">PetConnect &reg;</p>
    </footer>
  );
};
export default test;
