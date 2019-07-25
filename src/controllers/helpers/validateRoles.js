const validateRoles = data => (data.permissions && data.role && data.tablesAllowed)
&& data;
export default validateRoles;
