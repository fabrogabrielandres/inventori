import CardPopularProducts from "@/components/CardPopularProducts/CardPopularProducts";
import CardSalesSummary from "@/components/CardSalesSummary/CardSalesSummary";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
    </div>
  );
};

export default Dashboard;
