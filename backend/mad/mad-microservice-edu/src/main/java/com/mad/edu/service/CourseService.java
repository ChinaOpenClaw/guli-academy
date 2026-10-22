package com.mad.edu.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mad.edu.entity.Course;
import com.mad.edu.form.CourseInfoForm;
import com.mad.edu.query.CourseQuery;
import com.mad.edu.vo.CoursePublishVo;
import com.mad.edu.vo.CourseWebVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 课程 服务类
 * </p>
 *
 * @author Helen
 * @since 2019-06-24
 */
public interface CourseService extends IService<Course> {

	String saveCourseInfo(CourseInfoForm courseInfoForm);

	CourseInfoForm getCourseInfoFormById(String id);

	void updateCourseInfoById(CourseInfoForm courseInfoForm);

	void pageQuery(Page<Course> pageParam, CourseQuery courseQuery);

	void removeCourseById(String id);

	CoursePublishVo getCoursePublishVoById(String id);

	void publishCourseById(String id);

	Map<String,Object> pageListWeb(Page<Course> coursePage);

	List<Course> selectByTeacherId(String teacherId);

	/**
	 * 获取课程信息
	 * @param id
	 * @return
	 */
	CourseWebVo selectCourseWebVoById(String id);
}
