<template>
	<div class="continar">
		<!-- header -->
		<a-page-header
			style="border: 1px solid rgb(235, 237, 240)"
			title="Title"
			sub-title="This is a subtitle"
		>
			<template slot="extra">
				<a-input-search
					placeholder="input search text"
					style="width: 300px"
					@search="onSearch"
				/>
				<a-button type="danger"> delete </a-button>
				<a-button type="primary"> new </a-button>
			</template>
		</a-page-header>

		<!-- table -->
		<div class="table_continar">
			<a-table
				bordered
				:columns="columns"
				:data-source="tableDat"
				:pagination="false"
			>
				<span slot="customTitle"><a-icon type="smile-o" /> Name</span>
				<span slot="tags" slot-scope="tags">
					<a-tag
						v-for="tag in tags"
						:key="tag"
						:color="
							tag === 'loser'
								? 'volcano'
								: tag.length > 5
								? 'geekblue'
								: 'green'
						"
					>
						{{ tag.toUpperCase() }}
					</a-tag>
				</span>
				<span slot="action" slot-scope="text, record">
					<a>Invite 一 {{ record.name }}</a>
					<a-divider type="vertical" />
					<a>Delete</a>
					<a-divider type="vertical" />
					<a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
				</span>
				<div slot="footer">
					<a-pagination :default-current="6" :total="500" />
				</div>
			</a-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			columns: [
				{
					dataIndex: "name",
					key: "name",
					slots: { title: "customTitle" },
					scopedSlots: { customRender: "name" },
				},
				{
					title: "Age",
					dataIndex: "age",
					key: "age",
				},
				{
					title: "Address",
					dataIndex: "address",
					key: "address",
				},
				{
					title: "Tags",
					key: "tags",
					dataIndex: "tags",
					scopedSlots: { customRender: "tags" },
				},
				{
					title: "Action",
					key: "action",
					scopedSlots: { customRender: "action" },
				},
			],
			tableDat: [
				{
					key: "1",
					name: "John Brown",
					age: 32,
					address: "New York No. 1 Lake Park",
					tags: ["nice", "developer"],
				},
				{
					key: "2",
					name: "Jim Green",
					age: 42,
					address: "London No. 1 Lake Park",
					tags: ["loser"],
				},
				{
					key: "3",
					name: "Joe Black",
					age: 32,
					address: "Sidney No. 1 Lake Park",
					tags: ["cool", "teacher"],
				},
			],
		};
	},
	methods: {
		onSearch(value) {
			console.log(value);
		},
	},
};
</script>

<style scoped>
tr:last-child td {
	padding-bottom: 0;
}
.table_continar {
	width: 100%;
	padding: 20px;
	position: relative;
}
.continar {
	width: 100%;
}
</style>
