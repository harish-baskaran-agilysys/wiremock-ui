'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { withAuth } from 'wiremock/components/utils/withAuth';
import SidebarLayout from '../layout';
import { getWiremockUrl } from '../../../components/utils/wiremockUrl';

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

function ApiDocs() {
  const [spec, setSpec] = useState(null);
  const [error, setError] = useState(null);
  const url = getWiremockUrl() + '/__admin/swagger';

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();

        const updatedSpec = {
          ...json,
          servers: [
            {
              url: getWiremockUrl(),
            },
          ],
        };

        setSpec(updatedSpec);
      } catch (err) {
        console.error('Failed to fetch OpenAPI spec:', err);
        setError(err.message);
      }
    };

    fetchSpec();
  }, [url]);

  return (
    <SidebarLayout>
      {error ? (
        <div className='flex items-center'>
          <div style={{ color: 'red', padding: '20px' }}>
            <p>⚠️ Unable to load API documentation.</p>
            <p><strong>Error:</strong> {error}</p>
          </div>
        </div>
      ) : spec ? (
        <SwaggerUI spec={spec} />
      ) : (
        <div style={{ padding: '20px' }}>Loading API documentation...</div>
      )}
    </SidebarLayout>
  );
}

export default withAuth(ApiDocs);
