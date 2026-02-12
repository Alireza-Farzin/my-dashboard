import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardData } from "@/public/mock/cardData";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">خوش آمدید</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((item, index) => (
          <Card 
            key={index}
            className="border-[#fcfcfc14] bg-[#171717] hover:border-[#fcfcfc24] transition-colors"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}