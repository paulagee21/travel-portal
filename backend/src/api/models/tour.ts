import { knex } from '../../db/knex';
import  User from './user';

class Tour {

  baseQuery = () => {
    return knex.select(
        'tours.id as tour_id',
        'destination',
        'tours.description',
        'start_date',
        'end_date',
        'tour_managers.status as manager_status',
        'tour_finance_managers.status as finance_manager_status',
        knex.raw(`COALESCE(
          json_agg(
            json_build_object(
              'information', tour_info.description, 
              'requested_by', users.username
            )
          ) FILTER (WHERE tour_info.description IS NOT NULL), '[]')
        as additional_information`),
        'tours.created_at',
        'created_by'
      )
      .from('tours')
      .leftJoin('tour_managers', 'tours.id', 'tour_managers.tour_id')
      .leftJoin('tour_finance_managers', 'tours.id', 'tour_finance_managers.tour_id')
      .leftJoin('tour_info', 'tour_info.tour_id', 'tours.id')
      .leftJoin('users', 'tour_info.requestor_id', 'users.id')
      .groupBy('tours.id', 'tour_managers.status', 'tour_finance_managers.status');
  }

  getById = async (id) => {
    const query = this.baseQuery();
    query.select('hotel', 'ticket', 'airport_cab_home', 
      'airport_cab_destination', 'conveyance', 'mode_of_travel')
      .where({ 'tours.id': id })
      .first();
    const row = await query;
    return row;
  }

  getAll = async (user) => {
    let rows = this.baseQuery();
    console.log(user.role_id);
    if (user.role_id === User.EMPLOYEE_ROLE_ID) {
      rows = rows.where({ 'tours.created_by': user.username });
    }  else {
      if (user.role_id === User.MANAGER_ROLE_ID) {
        rows = rows.where({ 'tour_managers.manager_id' : user.user_id });
      } else {
        rows = rows.where(knex.raw('tour_finance_managers.tour_id IS NOT NULL'));
      }
    }
    rows =  await rows;
    console.log(rows);
    return rows;
  }

  create = async (data, user) => {
    data.created_by = user.username;
    const tour = await knex('tours').insert(data).returning(['id']);
    return tour[0];
  }

  edit = async (id, data, user?) => {
    await knex('tours').update(data).where({ id: id });
    return { status: 'success' };
  }

  submit = async (id, data) => {
    if (data.manager) {
      await knex('tour_managers')
        .insert({ tour_id: id, manager_id: data.manager, status: 'pending' }).returning(['id']);
    } else if (data.finance_manager) {
      await knex('tour_finance_managers')
        .insert({ tour_id: id, manager_id: data.finance_manager, status: 'pending' }).returning(['id']);
    }
    return { status: 'success' };
  }

  updateStatus = async (id, user, status) => {
    if (user.role_id === User.MANAGER_ROLE_ID) {
      await knex('tour_managers')
        .update({ status: status })
        .where({ manager_id: user.user_id, tour_id: id });
      if (status === 'approved') {
        await knex('tour_finance_managers')
          .insert({ tour_id: id, status: 'pending' });
      }
    } else {
      await knex('tour_finance_managers')
        .update({ status: status })
        .where({ tour_id: id });
    }
    return { status: 'success' };
  }

  addInfo = async (id, data) => {
    let requestor;
    const tm = await knex('tour_managers')
      .select('manager_id').where({ tour_id: id, status: 'requesting_information' }).first();
    if (tm) {
      requestor = tm.manager_id;
      await knex('tour_managers').update({ status: 'pending' })
        .where({ tour_id: id, manager_id: requestor });
    } else {
      const tfm = await knex('tour_finance_managers')
        .select('manager_id').where({ tour_id: id, status: 'requesting_information' }).first();
      requestor = tfm.manager_id;
      await knex('tour_finance_managers').update({ status: 'pending' })
        .where({ tour_id: id, manager_id: requestor });
    }
    await knex('tour_info').insert({ tour_id: id, description: data.description, requestor_id: requestor });
    console.log(data);
    return { status: 'success' };
  }
}

export default Tour;
