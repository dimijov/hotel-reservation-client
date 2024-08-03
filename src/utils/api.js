// src/utils/api.js
export const handleApiError = async (response) => {
  if (response.ok) {
    return null;
  }
  
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    const errorData = await response.json();
    if (typeof errorData === 'object' && errorData !== null) {
      return Object.values(errorData).join('\n');
    }
  } else {
    const errorText = await response.text();
    return errorText;
  }
  
  return 'Unknown error occurred';
};
