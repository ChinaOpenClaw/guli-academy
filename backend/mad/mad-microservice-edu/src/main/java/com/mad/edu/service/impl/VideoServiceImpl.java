package com.mad.edu.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mad.edu.entity.Video;
import com.mad.edu.form.VideoInfoForm;
import com.mad.edu.mapper.VideoMapper;
import com.mad.edu.service.VideoService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 课程视频 服务实现类
 * </p>
 *
 * @author Helen
 * @since 2019-06-24
 */
@Service
public class VideoServiceImpl extends ServiceImpl<VideoMapper, Video> implements VideoService {

	@Override
	public void saveVideoInfo(VideoInfoForm videoInfoForm) {

		Video video = new Video();
		BeanUtils.copyProperties(videoInfoForm, video);
		this.save(video);
	}

	@Override
	public VideoInfoForm getVideoInfoFormById(String id) {
		//从video表中取数据
		Video video = this.getById(id);
		//创建videoInfoForm对象
		VideoInfoForm videoInfoForm = new VideoInfoForm();
		BeanUtils.copyProperties(video, videoInfoForm);

		return videoInfoForm;
	}

	@Override
	public void updateVideoInfoById(VideoInfoForm videoInfoForm) {
		//保存课时基本信息
		Video video = new Video();
		BeanUtils.copyProperties(videoInfoForm, video);
		this.updateById(video);
	}

	@Override
	public void removeVideoById(String id) {

		//删除视频资源 TODO

		baseMapper.deleteById(id);
	}
}
