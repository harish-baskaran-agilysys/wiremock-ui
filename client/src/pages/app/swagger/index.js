import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css'; // Import Swagger UI CSS
import { withAuth } from "wiremock/components/withAuth";
import SidebarLayout from '../layout';
import { getWiremockUrl } from '../utils/wiremockUrl';

function ApiDocs() {
  const [spec, setSpec] = useState(null);
  const url = getWiremockUrl() + "/__admin/swagger"; // Adjust this URL as needed

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setSpec(json);
      } catch (error) {
        console.error("Failed to fetch OpenAPI spec:", error);
      }
    };

    fetchSpec();
  }, [url]);

  return (
    <SidebarLayout>
      {spec ? <SwaggerUI spec={spec} /> : <div>Loading...</div>}
    </SidebarLayout>
  );
}

export default withAuth(ApiDocs);
