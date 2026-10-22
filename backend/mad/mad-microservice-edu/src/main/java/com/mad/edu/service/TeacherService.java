package com.mad.edu.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mad.edu.entity.Teacher;
import com.mad.edu.query.TeacherQuery;

import java.util.Map;

/**
 * <p>
 * 讲师 服务类
 * </p>
 *
 * @author Helen
 * @since 2019-06-24
 */
public interface TeacherService extends IService<Teacher> {

	void pageQuery(Page<Teacher> pageParam, TeacherQuery teacherQuery);

	public Map<String, Object> pageListWeb(Page<Teacher> pageParam);
}
