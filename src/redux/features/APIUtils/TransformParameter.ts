import { SearchCriteria } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";
import _ from "lodash";

const transformDirectionInSort = (direction: string): string => {
	return direction === "ascend" ? "asc" : "desc";
};

const transformSearchQuery = (criteria: SearchCriteria): string => {
	let query = "";
	if (!_.isEmpty(criteria.keyword)) {
		query += `keyword=${criteria.keyword}&`;
	}
	console.log("askfjassaflksaf", criteria);
	const filter = criteria.filter
		.map((f) => `filter=${f.field},${f.values.join(".")}`)
		.join("&");
	if (!_.isEmpty(filter)) {
		query += `${filter}&`;
	}
	const sort = criteria.sort
		.map((s) => `sort=${s.field},${transformDirectionInSort(s.order)}`)
		.join("&");
	if (!_.isEmpty(sort)) {
		query += `${sort}&`;
	}
	query += `page=${criteria.pagination.page}&size=${criteria.pagination.size}`;

	console.log("query: ", query);
	return query;
};

export { transformDirectionInSort, transformSearchQuery };
