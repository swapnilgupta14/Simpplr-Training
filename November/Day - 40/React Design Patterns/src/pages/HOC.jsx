import React, { useState, useEffect } from "react";

function withDataFetching(WrappedComponent, fetchFunction) {
  return function DataFetchingWrapper(props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        try {
          setIsLoading(true);
          const result = await fetchFunction();
          setData(result);
          setError(null);
        } catch (err) {
          setError(err);
          setData(null);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    }, []);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40 text-gray-500">
          Loading data...
        </div>
      );
    }
    if (error) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p className="font-bold">Error: </p>
          <span className="block sm:inline">{error.message}</span>
        </div>
      );
    }
    return <WrappedComponent data={data} {...props} />;
  };
}

function UserDetails({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="space-y-2">
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Company: {data.company.name}</p>
        <p>Website: {data.website}</p>
      </div>
    </div>
  );
}

async function fetchUserData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.status === 200) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}

const EnhancedUserDetails = withDataFetching(UserDetails, fetchUserData);

export default function HOC() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Data Fetching HOC Example</h1>
      <EnhancedUserDetails />
    </div>
  );
}
