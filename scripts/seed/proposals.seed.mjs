import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

const { faker } = require('@faker-js/faker/locale/ja'); // 日本語ロケールを直接インポート

async function seedProposals() {
	/**
	 * 配列からランダムに 1 要素取り出す
	 * 空配列の場合は undefined を返す
	 */
	function pickOne(arr) {
		if (arr.length === 0) return undefined;
		return arr[Math.floor(Math.random() * arr.length)];
	}


	// 既存データ削除
	const { error: deleteError } = await supabase
		.from('proposals')
		.delete()
		.gte('id', '00000000-0000-0000-0000-000000000000'); // uuidの最小値を指定

	if (deleteError) {
		console.error('Delete error:', deleteError.message);
		throw deleteError;
	}


    // master_departmentsから全部署IDを取得
    const { data: departments, error: depError } = await supabase
        .from("master_departments")
        .select("id, name")
        .in("name", ['情報システム課']) // test data only 情報システム課
        // .eq("name", 'BPO事業部') // test data only 情報システム課
		;

		if (depError) {
        console.error("Error fetching master_departments:", depError.message);
        throw depError;
    }
    if (!departments.length) {
        console.error("No departments found in master_departments.");
        return;
    }

	// master_typesから全部署IDを取得
    const { data: types, error: typeError } = await supabase
        .from("master_types")
        .select("id");
    if (typeError) {
        console.error("Error fetching master_types:", typeError.message);
        throw typeError;
    }
    if (!types.length) {
        console.error("No types found in master_types.");
        return;
    }

	// master_staffsから全部署IDを取得
	const { data: staffs, error: staffError } = await supabase
        .from("master_staffs")
        .select("id, name")
		;
    if (staffError) {
        console.error("Error fetching master_staffs:", staffError.message);
        throw staffError;
    }
    if (!staffs.length) {
        console.error("No staffs found in master_staffs.");
        return;
    }

	// master_department_leadersから全部署IDを取得
	const { data: departmentLeaders, error: departmentLeaderError } = await supabase
        .from("master_department_leaders")
        .select("*")
		;
    if (departmentLeaderError) {
        console.error("Error fetching departmentLeaders:", departmentLeaderError.message);
        throw departmentLeaderError;
    }
    if (!departmentLeaders.length) {
        console.error("No departmentLeaders found in departmentLeaders.");
        return;
    }

	for (let i = 0; i < 15; i++) {
		const { data: created, error } = await supabase
			.from('proposals')
			.insert([
				{
					id: uuidv4(),
					department_id: pickOne(departments).id,
					type_id: pickOne(types).id,
					title: `改善提案ダミー ${i+1}`,
					// title: faker.lorem.sentence(3),
					is_form_submit: pickOne([true, false]),
					target_month: pickOne(['2025-07-01']),
					remarks: '',
					improved_at: null,
				}
			])
			.select()
			.single();

		if (error) {
			console.error('Seed error:', error.message);
			throw error;
		}

		const { author_error } = await supabase
			.from('proposal_authors')
			.insert([
				{
					id: uuidv4(),
					proposal_id: created.id,
					staff_id: pickOne(staffs).id,
				}
			]);
		if (author_error) {
			console.error('Seed error:', author_error.message);
			throw author_error;
		}

		if(i===0) {
			// award_turns への seed
			// const departmentID = pickOne(departments).id;
			const departmentID = departments.find(s => s.name === '情報システム課').id;
			const leaderID = staffs.find(s => s.name === '若林 雅也').id;
			const { error: award_turns_error } = await supabase
				.from('award_turns')
				.insert([
					// {
					// 	id: uuidv4(),
					// 	department_id: departmentID,
					// 	target_month: pickOne(['2025-06-01']),
					// 	leader_id: departmentLeaders.find(dl => dl.staff_id == leaderID && dl.department_id === departmentID).id
					// },
					{
						id: uuidv4(),
						department_id: departmentID,
						target_month: pickOne(['2025-07-01']),
						leader_id: departmentLeaders.find(dl => dl.staff_id == leaderID && dl.department_id === departmentID).id
					}

				])
			if (award_turns_error) {
				console.error('Seed error:', award_turns_error.message);
				throw award_turns_error;
			}
		}
		// if(i===0) {
		// 	// award_turns への seed
		// 	// const departmentID = pickOne(departments).id;
		// 	const departmentID = departments.find(s => s.name === 'BPO事業部').id;
		// 	const leaderID = staffs.find(s => s.name === '星 幸恵').id;
		// 	const { error: award_turns_error } = await supabase
		// 		.from('award_turns')
		// 		.insert([
		// 			{
		// 				id: uuidv4(),
		// 				department_id: departmentID,
		// 				target_month: pickOne(['2025-06-01']),
		// 				leader_id: departmentLeaders.find(dl => dl.staff_id == leaderID && dl.department_id === departmentID).id
		// 			},
		// 			{
		// 				id: uuidv4(),
		// 				department_id: departmentID,
		// 				target_month: pickOne(['2025-07-01']),
		// 				leader_id: departmentLeaders.find(dl => dl.staff_id == leaderID && dl.department_id === departmentID).id
		// 			}

		// 		])
		// 	if (award_turns_error) {
		// 		console.error('Seed error:', award_turns_error.message);
		// 		throw award_turns_error;
		// 	}
		// }
	};

	console.log('proposals seeded successfully!');
}

if (require.main === module) {
	seedProposals()
		.then(() => process.exit(0))
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}

module.exports = {
	seedProposals,
};
