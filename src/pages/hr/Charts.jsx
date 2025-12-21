import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#0088FE", "#00C49F"];
const BAR_COLOR = "#8884d8";
const PIE_LABEL_COLOR = "#fff";
const RADIAN = Math.PI / 180;

// Customized Pie chart label
const renderCustomizedPieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null)
        return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={PIE_LABEL_COLOR}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            fontSize={12}
            fontWeight={600}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Charts = ({ isAnimationActive = true }) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const {
        data: chartData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["chartData", user?.email],
        queryFn: async () => {
            const res = await axiosInstance(`/chartdata?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError || !chartData) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">
                    Failed to load chart data.
                </p>
            </div>
        );
    }

    const total = chartData.totalCount || 0;
    const pieData =
        total > 0
            ? [
                  { name: "Returnable", value: chartData.returnableCount },
                  {
                      name: "Non-Returnable",
                      value: total - chartData.returnableCount,
                  },
              ]
            : [];

    const barData = chartData.resultArray.map((asset) => ({
        name: asset.assetName,
        requests: asset.count,
    }));

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-10">
            {/* Pie Chart Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
                    Asset Returnability
                </h2>
                {pieData.length === 0 ? (
                    <p className="text-center text-gray-400 mt-4">
                        No returnable asset data available.
                    </p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={renderCustomizedPieLabel}
                                isAnimationActive={isAnimationActive}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${entry.name}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value}`, name]}
                                contentStyle={{
                                    fontSize: "0.9rem",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Bar Chart Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
                    Top 5 Requested Assets
                </h2>
                {barData.length === 0 ? (
                    <p className="text-center text-gray-400 mt-4">
                        No asset request data available.
                    </p>
                ) : (
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            data={barData}
                            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                angle={-20}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                formatter={(value) => [
                                    `${value} requests`,
                                    "Requests",
                                ]}
                                contentStyle={{
                                    fontSize: "0.9rem",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend verticalAlign="top" />
                            <Bar
                                dataKey="requests"
                                fill={BAR_COLOR}
                                radius={[8, 8, 0, 0]}
                                barSize={36}
                                isAnimationActive={isAnimationActive}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Charts;
